export interface ChatAuthor {
    id: number;
    name: string;
    role: "Student" | "Instructor";
    student_id?: string;
}

export interface ChatAttachment {
    id: number;
    file_url: string;
    file_type: string;
    original_name: string;
}

export interface ChatReply {
    id: number;
    post_id: number;
    content: string;
    created_at: string;
    author: ChatAuthor;
    like_count: number;
    is_liked_by_me: boolean;
}

export interface QAPost {
    id: number;
    course_id: number;
    batch_name: string;
    content: string;
    visibility: "public" | "private";
    is_pinned: boolean;
    pinned_at: string | null;
    created_at: string;
    updated_at: string;
    author: ChatAuthor;
    is_instructor: boolean;
    like_count: number;
    reply_count: number;
    is_liked_by_me: boolean;
    is_bookmarked_by_me: boolean;
    replies: ChatReply[];
    attachments: ChatAttachment[];
}

export interface DMMessage {
    id: number;
    conversation_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
    sender: ChatAuthor;
    attachments: ChatAttachment[];
    like_count: number;
    is_liked_by_me: boolean;
    is_bookmarked_by_me: boolean;
}

export interface DMConversation {
    id: number;
    other_user: ChatAuthor;
    last_message: DMMessage | null;
    unread_count: number;
    course_id: number;
}

export interface GroupMember {
    id: number;
    name: string;
    role: string;
    is_online: boolean; 
}

export interface GroupChat {
    id: number;
    batch_name: string;
    course_id: number;
    name: string;
}

export interface GroupMessage {
    id: number;
    group_id: number;
    content: string;
    created_at: string;
    sender: ChatAuthor;
    attachments: ChatAttachment[];
    like_count: number;
    is_liked_by_me: boolean;
    is_bookmarked_by_me: boolean;
    is_pinned: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    page_size: number;
}
