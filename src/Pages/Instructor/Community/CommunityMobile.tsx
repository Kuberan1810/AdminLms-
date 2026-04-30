import { useState, useEffect } from "react";

import CommunityTabs from "./communitycomponent/CommunityTabs";
import PostCard from "./communitycomponent/PostCard";
import CreatePostModal from "./communitycomponent/CreatePostModal";

import type { Post } from "./types/post";
import type { CommunityTab } from "./types/tab";
import { 
    getPostFeed, 
    createPost, 
    toggleLike, 
    deletePost, 
    toggleBookmark, 
    togglePin 
} from "../../../services/chatService";

interface CommunityContentProps {
    courseId?: number;
    batchName?: string;
}

export default function CommunityContent({ 
    courseId = 1, 
    batchName = "Batch-01" 
}: CommunityContentProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState<CommunityTab>("All Post");
    const [showModal, setShowModal] = useState(false);
    const [openPostId, setOpenPostId] = useState<number | null>(null);

    const fetchFeed = async () => {
        try {
            setLoading(true);
            const data = await getPostFeed(courseId, batchName);
            
            // Map the API schema 'ChatPost' to UI schema 'Post'
            const mappedPosts: Post[] = data.map(apiPost => ({
                id: apiPost.id,
                author: apiPost.author.name,
                role: apiPost.is_instructor ? "Instructor" : "Student",
                title: "", // API does not provide a title
                description: apiPost.content,
                tag: "General Discussion", // Default tag since API doesn't provide one
                time: new Date(apiPost.created_at).toLocaleDateString(),
                likes: apiPost.like_count || 0,
                liked: apiPost.is_liked_by_me || false,
                saved: apiPost.is_bookmarked_by_me || false,
                isMine: apiPost.is_instructor, // Assume if instructor, it's theirs for now
                isInstructor: apiPost.is_instructor,
                isPinned: apiPost.is_pinned,
                pinned: apiPost.is_pinned,
                comments: (apiPost.replies || []).map(r => ({
                    id: r.id,
                    author: r.author?.name || "Unknown",
                    role: r.is_instructor ? "Instructor" : "Student",
                    time: new Date(r.created_at).toLocaleTimeString(),
                    text: r.content
                }))
            }));
            
            setPosts(mappedPosts);
        } catch (error) {
            console.error("Failed to load community feed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, [courseId, batchName]);

    const filteredPosts = posts.filter((post) => {
        if (activeTab === "All Post") return true;
        if (activeTab === "My Post") return post.isMine;
        if (activeTab === "Saved Post") return post.saved;
        if (activeTab === "Announcements") return post.tag === "Announcement";
        if (activeTab === "Doubts & Q/A") return post.tag === "Doubts" || post.tag === "Q/A";
        if (activeTab === "General Discussion") return post.tag === "General Discussion";
        return true;
    }).sort((a, b) => Number(b.isPinned) - Number(a.isPinned));

    const handleLike = async (id: number) => {
        // Optimistic UI update
        setPosts(prev => prev.map(post => post.id === id ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
        } : post));
        
        try {
            await toggleLike(courseId, batchName, id);
        } catch (error) {
            console.error(error);
            fetchFeed(); // Revert on failure
        }
    };

    const handleDelete = async (id: number) => {
        // Optimistic UI update
        setPosts(prev => prev.filter(post => post.id !== id));
        
        try {
            await deletePost(courseId, batchName, id);
        } catch (error) {
            console.error(error);
            fetchFeed(); // Revert on failure
        }
    };

    const handlePin = async (id: number) => {
        setPosts((prev) => prev.map((post) => post.id === id ? { ...post, pinned: !post.pinned, isPinned: !post.pinned } : post));
        try {
            await togglePin(courseId, batchName, id);
            fetchFeed(); // Enforce correct ordering from server
        } catch (error) {
            console.error(error);
            fetchFeed();
        }
    };

    const handleComment = (id: number) => {
        setOpenPostId(prev => (prev === id ? null : id));
    };

    const handleSave = async (id: number) => {
        setPosts(prev => prev.map(post => post.id === id ? { ...post, saved: !post.saved } : post));
        try {
            await toggleBookmark(courseId, batchName, id);
        } catch (error) {
            console.error(error);
            fetchFeed();
        }
    };

    const handleCreateSubmit = async (newPostData: any) => {
        try {
            // newPostData coming from CreatePostModal usually has things like `description` which we map to `content`
            const content = newPostData.description || newPostData.title || "New format...";
            await createPost(courseId, batchName, content);
            setShowModal(false);
            fetchFeed(); // Reload entirely
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    return (
        <div className="h-screen flex flex-col ">
            <CommunityTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onCreate={() => setShowModal(true)}
            />

            <div className="flex-1 grid gap-4 mt-4 overflow-hidden ">
                <div className="md:col-span-8 lg:col-span-9 space-y-4 overflow-y-auto scrollbar-hide">
                    {loading ? (
                        <div className="flex justify-center py-10 opacity-60">Loading community feed...</div>
                    ) : (
                        filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onLike={handleLike}
                                    onComment={handleComment}
                                    onDelete={handleDelete}
                                    onSave={handleSave}
                                    onPin={handlePin}
                                    isOpen={openPostId === post.id}
                                    isMyPost={post.isMine}
                                />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500">No posts exist for {batchName} yet.</div>
                        )
                    )}
                </div>
            </div>

            {showModal && (
                <CreatePostModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleCreateSubmit}
                />
            )}
        </div>
    );
}