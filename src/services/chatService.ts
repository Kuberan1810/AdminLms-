import api from "../config/axios";

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface ChatAuthor {
    id: number;
    name: string;
    role: string;
    student_id?: string | null;
}

export interface ChatReply {
    id: number;
    post_id: number;
    content: string;
    created_at: string;
    updated_at: string;
    is_instructor: boolean;
    author: ChatAuthor;
}

export interface ChatPost {
    id: number;
    course_id: number;
    batch_name: string;
    content: string;
    created_at: string;
    updated_at: string;
    is_pinned: boolean;
    pinned_at: string | null;
    author: ChatAuthor;
    is_instructor: boolean;
    like_count: number;
    reply_count: number;
    is_liked_by_me: boolean;
    is_bookmarked_by_me: boolean;
    replies: ChatReply[];
}

export interface CreatePostRequest {
    course_id: number;
    batch_name: string;
    content: string;
}

// ─── API Methods ─────────────────────────────────────────────────────────────

/**
 * GET /chat/{course_id}/{batch_name}
 * Get Post Feed
 */
export const getPostFeed = async (
    courseId: number,
    batchName: string,
    page: number = 1,
    pageSize: number = 20,
    pinnedFirst: boolean = true
): Promise<ChatPost[]> => {
    const response = await api.get(`/chat/${courseId}/${batchName}`, {
        params: { page, page_size: pageSize, pinned_first: pinnedFirst },
    });
    return response.data;
};

/**
 * POST /chat/{course_id}/{batch_name}
 * Create Post
 */
export const createPost = async (
    courseId: number,
    batchName: string,
    content: string
): Promise<ChatPost> => {
    const response = await api.post(`/chat/${courseId}/${batchName}`, {
        course_id: courseId,
        batch_name: batchName,
        content,
    });
    return response.data;
};

/**
 * GET /chat/{course_id}/{batch_name}/{post_id}
 * Get a single Post
 */
export const getPost = async (
    courseId: number,
    batchName: string,
    postId: number
): Promise<ChatPost> => {
    const response = await api.get(`/chat/${courseId}/${batchName}/${postId}`);
    return response.data;
};

/**
 * DELETE /chat/{course_id}/{batch_name}/{post_id}
 * Delete Post
 */
export const deletePost = async (
    courseId: number,
    batchName: string,
    postId: number
): Promise<string> => {
    const response = await api.delete(`/chat/${courseId}/${batchName}/${postId}`);
    return response.data;
};

/**
 * POST /chat/{course_id}/{batch_name}/{post_id}/replies
 * Add Reply
 */
export const addReply = async (
    courseId: number,
    batchName: string,
    postId: number,
    content: string
): Promise<ChatReply> => {
    const response = await api.post(`/chat/${courseId}/${batchName}/${postId}/replies`, {
        content,
    });
    return response.data;
};

/**
 * DELETE /chat/{course_id}/{batch_name}/replies/{reply_id}
 * Delete Reply
 */
export const deleteReply = async (
    courseId: number,
    batchName: string,
    replyId: number
): Promise<string> => {
    const response = await api.delete(`/chat/${courseId}/${batchName}/replies/${replyId}`);
    return response.data;
};

/**
 * POST /chat/{course_id}/{batch_name}/{post_id}/like
 * Toggle Like
 */
export const toggleLike = async (
    courseId: number,
    batchName: string,
    postId: number
): Promise<any> => {
    const response = await api.post(`/chat/${courseId}/${batchName}/${postId}/like`);
    return response.data;
};

/**
 * POST /chat/{course_id}/{batch_name}/{post_id}/bookmark
 * Toggle Bookmark
 */
export const toggleBookmark = async (
    courseId: number,
    batchName: string,
    postId: number
): Promise<string> => {
    const response = await api.post(`/chat/${courseId}/${batchName}/${postId}/bookmark`);
    return response.data;
};

/**
 * POST /chat/{course_id}/{batch_name}/{post_id}/pin
 * Toggle Pin
 */
export const togglePin = async (
    courseId: number,
    batchName: string,
    postId: number
): Promise<string> => {
    const response = await api.post(`/chat/${courseId}/${batchName}/${postId}/pin`);
    return response.data;
};

/**
 * GET /chat/{course_id}/{batch_name}/bookmarks/my
 * My Bookmarks
 */
export const getMyBookmarks = async (
    courseId: number,
    batchName: string
): Promise<ChatPost[]> => {
    const response = await api.get(`/chat/${courseId}/${batchName}/bookmarks/my`);
    return response.data;
};
