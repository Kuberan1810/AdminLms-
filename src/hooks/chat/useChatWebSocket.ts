import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../../config/api';

type ChatType = 'dm' | 'group' | 'qa';

interface UseChatWebSocketParams {
  type: ChatType;
  id: string | number | null; // conversationId, groupId, or courseId
}

export const useChatWebSocket = ({ type, id }: UseChatWebSocketParams) => {
  const [isConnected, setIsConnected] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<Record<number, string>>({}); // { userId: userName }
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    // Convert http:// or https:// to ws:// or wss://
    const wsBaseUrl = BASE_URL.replace(/^http/, 'ws');
    
    let path = '';
    if (type === 'dm') path = `/ws/chat/${id}`;
    else if (type === 'group') path = `/ws/chat/group/${id}`;
    else if (type === 'qa') path = `/ws/qa/${id}`;

    const wsUrl = `${wsBaseUrl}${path}?token=${token}`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    let pingInterval: number;

    ws.onopen = () => {
      setIsConnected(true);
      // Send ping every 30s
      pingInterval = window.setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case 'connected':
          case 'user_joined':
          case 'user_left':
            if (data.online_count !== undefined) {
              setOnlineCount(data.online_count);
            }
            break;
            
          case 'new_message':
            // Bust relevant queries to pull new messages automatically
            if (type === 'dm') queryClient.invalidateQueries({ queryKey: ['dm-messages', id] });
            else if (type === 'group') queryClient.invalidateQueries({ queryKey: ['group-messages', id] });
            else if (type === 'qa') queryClient.invalidateQueries({ queryKey: ['qa-feed', id] });
            break;

          case 'typing':
            if (data.user_id && data.user_name) {
              setTypingUsers((prev) => ({ ...prev, [data.user_id]: data.user_name }));
              
              // Auto-remove typing indicator after 3 seconds
              setTimeout(() => {
                setTypingUsers((prev) => {
                  const next = { ...prev };
                  delete next[data.user_id];
                  return next;
                });
              }, 3000);
            }
            break;

          case 'read':
            if (type === 'dm') {
               queryClient.invalidateQueries({ queryKey: ['dm-messages', id] });
               queryClient.invalidateQueries({ queryKey: ['dm-conversations'] });
            }
            break;
            
          case 'pin':
          case 'delete':
            if (type === 'dm') queryClient.invalidateQueries({ queryKey: ['dm-messages', id] });
            else if (type === 'group') queryClient.invalidateQueries({ queryKey: ['group-messages', id] });
            else if (type === 'qa') queryClient.invalidateQueries({ queryKey: ['qa-feed', id] });
            break;
        }
      } catch (err) {
        console.error('Failed to parse WS message', err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
      window.clearInterval(pingInterval);
    };

    return () => {
      window.clearInterval(pingInterval);
      ws.close();
    };
  }, [id, type, queryClient]);

  const sendMessage = (text: string, attachment_url: string | null = null) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "message", text, attachment_url }));
    }
  };

  const sendTyping = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "typing" }));
    }
  };

  return { isConnected, onlineCount, typingUsers, sendMessage, sendTyping };
};
