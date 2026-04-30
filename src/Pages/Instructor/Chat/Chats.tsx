import { useEffect, useRef, useState } from "react";
import {
  Send,
  ChevronLeft,
  Heart,
  MessageCircle,
  Bookmark,
  Pin,
  Paperclip,
} from "lucide-react";

interface Props {
  chat: any; // We'll pass the mapped chat object
  isPrivate?: boolean;
  onViewMembers?: () => void;
  onBack?: () => void;
  onlineCount?: number;
  typingUsers?: Record<number, string>;
}

import { useSendGroupMessage, useLikeGroupMessage, usePinGroupMessage, useBookmarkGroupMessage } from "../../../hooks/chat/useGroup";
import { useSendDMMessage, useLikeDMMessage, useBookmarkDMMessage } from "../../../hooks/chat/useDM";
import { useUploadChatFile } from "../../../hooks/chat/useUpload";
import type { ChatAttachment } from "../../../types/chat";

const ChatWindow = ({ chat, onViewMembers, onBack, onlineCount, typingUsers }: Props) => {
  const [text, setText] = useState("");
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadedAttachmentId, setUploadedAttachmentId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sendGroupMsgMutation = useSendGroupMessage();
  const toggleGroupLikeMutation = useLikeGroupMessage();
  const toggleGroupPinMutation = usePinGroupMessage();
  const toggleGroupBookmarkMutation = useBookmarkGroupMessage();

  const sendDMMsgMutation = useSendDMMessage();
  const toggleDMLikeMutation = useLikeDMMessage();
  const toggleDMBookmarkMutation = useBookmarkDMMessage();
  const uploadMutation = useUploadChatFile();

  const currentUserRole: "Instructor" | "Student" = "Instructor";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const handleSend = () => {
    if (!text.trim() && !uploadedAttachmentId) return;

    const attachmentIds = uploadedAttachmentId ? [uploadedAttachmentId] : [];

    if (chat.type === "individual") {
       sendDMMsgMutation.mutate({ conversationId: chat.id, content: text, attachmentIds });
    } else {
       sendGroupMsgMutation.mutate({ groupId: chat.id, content: text, attachmentIds });
    }
    setText("");
    setSelectedImage(null);
    setUploadedAttachmentId(null);
  };

  /*
  const handleImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };
  */

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show preview
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);

    // 2. Upload and store ID
    uploadMutation.mutate(file, {
        onSuccess: (data: ChatAttachment) => setUploadedAttachmentId(data.id)
    });
  };

  const handleLike = (id: string | number) => {
    if (chat.type === "individual") toggleDMLikeMutation.mutate({ messageId: Number(id) });
    else toggleGroupLikeMutation.mutate({ messageId: Number(id) });
  };

  const handleSave = (id: string | number) => {
    if (chat.type === "individual") toggleDMBookmarkMutation.mutate({ messageId: Number(id) });
    else toggleGroupBookmarkMutation.mutate({ messageId: Number(id) });
  };

  const handlePin = (id: string | number) => {
    if (chat.type === "group") toggleGroupPinMutation.mutate({ groupId: chat.id, messageId: Number(id) });
  };

  const handleReplySubmit = () => {
    console.warn("Replies are not natively supported in Group Messages.");
  };

  return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-[#1E1E1E] rounded-xl transition-colors">  
        <div className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 bg-white dark:bg-[#1E1E1E] border-b border-gray-200 dark:border-gray-700">        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="w-11 h-11 rounded-full bg-[#FF7A00] text-white flex items-center justify-center font-semibold">
            {chat.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {chat.name}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {chat.type === "group"
                ? "Batch • AML01 - AI"
                : "AML01 - AI"}
            </p>
          </div>
        </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-green-500 font-medium whitespace-nowrap hidden sm:inline-block">
                {onlineCount ? `${onlineCount} Online` : 'Connected'}
              </span>
              <button
                onClick={onViewMembers}
                className="w-10 h-10 flex border-[1.5px] border-[#FF7A00] items-center justify-center rounded-full bg-white dark:bg-[#2A2A2A] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
              >
                <Pin size={18} className="text-[#FF7A00]" />
              </button>
            </div>

        {chat.type === "individual" && (
          <button className="px-4 py-2 text-xs border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-[#2A2A2A] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#333]" >
            View Profile
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {chat.type === "individual" && (
          <div className="space-y-6 py-6 px-2 rounded-lg">
            {chat.messages.map((msg: any) => {
              const isMe = msg.sender === "me";

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`flex items-end gap-3 max-w-[70%] ${isMe ? "flex-row-reverse" : ""
                      }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold
                      ${isMe
                          ? "bg-green-500 text-white"
                          : "bg-[#FF7A00] text-white"
                        }`}
                    >
                      {isMe ? "ME" : chat.name.charAt(0)}
                    </div>

                    <div>
                      <div
                        className={`p-1 rounded-xl text-sm leading-6
                        ${isMe
                            ? "bg-[#FF7A00] text-white rounded-br-sm"
                            : "bg-gray-200 dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 rounded-bl-sm"
                          }`}
                      >
                        {msg.image && (
                          <img
                            src={msg.image}
                            alt="sent"
                            className="rounded-lg max-h-50 object-contain"
                          />
                        )}
                        {msg.text}
                      </div>

                      <p
                        className={`text-[11px] text-gray-500 mt-1 ${isMe ? "text-right" : "text-left"
                          }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {chat.type === "group" &&
          chat.messages.map((msg: any) => (
            <div key={msg.id} className="mb-4">

              <div className="relative border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#2A2A2A] p-4 rounded-xl">
                {currentUserRole === "Instructor" && (
                  <button
                    onClick={() => handlePin(msg.id)}
                    className="absolute top-3 right-3 flex items-center gap-1 text-xs transition"
                  >
                    <Pin
                      size={14}
                      className={`${msg.pinned
                          ? "fill-[#FF7A00] text-[#FF7A00]"
                          : "text-gray-400 hover:text-[#FF7A00]"
                        }`}
                    />
                    {msg.pinned && (
                      <span className="text-[#FF7A00]">
                        Pinned by instructor
                      </span>
                    )}
                  </button>
                )}

                <div className="flex flex-col gap-3">
                  <div className="flex justify-start gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#FF7A00] text-white flex items-center justify-center text-sm font-semibold shrink-0">
                      {msg.sender === "me" ? "RK" : "B"}
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold dark:text-white text-gray-900">
                          {msg.name}
                        </p>

                        <div className="flex gap-2 items-center mt-1">
                          <span className="px-2 py-0.5 text-xs text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-[#3D2B20] rounded-full">
                            {msg.role}
                          </span>
                          {msg.is_private && (
                            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold border border-blue-200 dark:border-blue-800">
                              PRIVATE
                            </span>
                          )}

                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    {msg.title && (
                      <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white">
                        {msg.title}
                      </h3>
                    )}

                    {msg.image && (
                      <div className="mt-1">
                        <img
                          src={msg.image}
                          alt="sent"
                          className="rounded-lg max-h-60 object-contain border border-gray-200 dark:border-gray-700"
                        />
                      </div>
                    )}

                    {msg.text && (
                      <p className=" text-sm text-gray-800 dark:text-gray-200 leading-6">
                        {msg.text}
                      </p>
                    )}

                    {msg.replies && msg.replies.length > 0 && (
                      <div className="mt-3 space-y-6 border-l-2 border-[#FF7A00] pl-3">
                        {msg.replies.map((reply: any) => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FF7A00] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                              {reply.sender === "me" ? "RK" : "ST"}
                            </div>

                            <div className="flex-1">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                {reply.name}
                              </p>
                              <div className="flex gap-1 items-center">
                                <p className="w-15 px-1.5 py-0.5 text-center justify-center text-xs text-[#0088FF] dark:text-[#66b2ff] bg-[#D9FFFB] dark:bg-[#002f5c] rounded-xl border border-transparent dark:border-[#004f99]">
                                  {reply.role}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {reply.time}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                                {reply.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <hr className="border-gray-200 dark:border-gray-700 mt-2" />
                <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
                  <button
                    onClick={() => handleLike(msg.id)}
                    className="flex items-center gap-1 group"
                  >
                    <Heart
                      size={15}
                      className={`transition ${msg.liked
                          ? "fill-[#FF7A00] text-[#FF7A00]"
                          : "text-gray-400 group-hover:text-[#FF7A00]"
                        }`}
                    />
                    <span>{msg.likes || 0}</span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveReply(
                        activeReply === msg.id ? null : msg.id
                      )
                    }
                    className="flex items-center gap-1 text-gray-400 hover:text-[#FF7A00]"
                  >
                    <MessageCircle size={15} />
                    <span>{msg.replies?.length || 0}</span>
                  </button>

                  <button
                    onClick={() => handleSave(msg.id)}
                    className="ml-auto text-gray-400 hover:text-[#FF7A00]"
                  >
                    <div className="flex items-end">
                      <Bookmark
                        size={16}
                        className={
                          msg.saved
                            ? "fill-[#FF7A00] text-[#FF7A00]"
                            : ""
                        }
                      />
                    </div>
                  </button>
                </div>
              </div>

              {activeReply === msg.id && (
                <div className="mt-4 ml-4 flex gap-2">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleReplySubmit();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#FF7A00] focus:outline-none"
                    placeholder="Write a reply..."
                  />
                  <button
                    onClick={() => handleReplySubmit()}
                    className="bg-[#FF7A00] text-white px-4 rounded-lg text-sm"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}

        <div ref={bottomRef} />

      </div>
      {selectedImage && (
        <div className="px-6 py-2 bg-gray-100 dark:bg-[#2A2A2A] flex items-center gap-3">          
        <img
            src={selectedImage}
            alt="preview"
            className="h-16 rounded-lg"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="text-red-500 dark:text-red-400 text-sm hover:underline"
          > X
          </button>
        </div>
      )}

        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex gap-4 items-center bg-white dark:bg-[#1E1E1E] shrink-0">
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Paperclip size={16} />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-gray-200 
        rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A00]"
        placeholder="Type a message..."
      />

        <button
          onClick={handleSend}
          className="bg-[#FF7A00] text-white p-2.5 rounded-lg"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};


export default ChatWindow;