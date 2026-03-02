import { useState } from "react";

import CommunityTabs from "./communitycomponent/CommunityTabs";
import PostCard from "./communitycomponent/PostCard";
import CreatePostModal from "./communitycomponent/CreatePostModal";



import { posts as initialPosts } from "./data/posts";
import type { Post } from "./types/post";
import type { CommunityTab } from "./types/tab";


export default function CommunityContent() {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    const [activeTab, setActiveTab] = useState<CommunityTab>("All Post");
    const [showModal, setShowModal] = useState(false);
    const [openPostId, setOpenPostId] = useState<number | null>(null);

    const filteredPosts = posts.filter((post) => {
        if (activeTab === "All Post") return true;

        if (activeTab === "My Post") return post.isMine;

        if (activeTab === "Saved Post") return post.saved;

        if (activeTab === "Announcements")
            return post.tag === "Announcement";

        if (activeTab === "Doubts & Q/A")
            return post.tag === "Doubts" || post.tag === "Q/A";

        if (activeTab === "General Discussion")
            return post.tag === "General Discussion";

        return true;
    })

        .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));


    const handleLike = (id: number) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === id
                    ? {
                        ...post,
                        liked: !post.liked,
                        likes: post.liked ? post.likes - 1 : post.likes + 1
                    }
                    : post
            )
        );
    };
    const handleDelete = (id: number) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    const handlePin = (id: number) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id
                    ? { ...post, pinned: !post.pinned }
                    : post
            )
        );
    };


    const handleComment = (id: number) => {
        setOpenPostId(prev => (prev === id ? null : id));
    };

    const handleSave = (id: number) => {
        setPosts(prev =>
            prev.map(post =>
                post.id === id
                    ? { ...post, saved: !post.saved }
                    : post
            )
        );
    };


    return (
        <div className="h-screen flex flex-col bg-gray-50">

            {/* ================= TABS ================= */}
            <CommunityTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onCreate={() => setShowModal(true)}
            />

            {/* ================= CONTENT AREA ================= */}
            <div className="flex-1 grid  gap-4  mt-4 overflow-hidden ">

                {/* ================= LEFT – POSTS SCROLL ================= */}
                <div className="md:col-span-8 lg:col-span-9 space-y-4 overflow-y-auto  scrollbar-hide">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onLike={handleLike}
                            onComment={handleComment}
                            onDelete={handleDelete}
                            onSave={handleSave}
                            onPin={handlePin}
                            isOpen={openPostId === post.id}
                            isMyPost={true}
                        />
                    ))}
                </div>



            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <CreatePostModal
                    onClose={() => setShowModal(false)}
                    onSubmit={(newPost) => {
                        setPosts(prev => [newPost, ...prev]);
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}