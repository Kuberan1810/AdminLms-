import { useState } from "react";

import CommunityTabs from "./communitycomponent/CommunityTabs";
import PostCard from "./communitycomponent/PostCard";
import CreatePostModal from "./communitycomponent/CreatePostModal";

import TrendingSection from "./section/TrendingSection";
import MemberSection from "./section/MemberSection";

import { posts as initialPosts } from "./data/posts";
import type { Post } from "./types/post";
import type { CommunityTab } from "./types/tab";

export default function CommunityContent() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<CommunityTab>("All Post");
  const [showModal, setShowModal] = useState(false);
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const filteredPosts = posts
    .filter((post) => {
      if (activeTab === "My Post") return post.isMine;
      if (activeTab === "Saved Post") return post.saved;
      if (activeTab === "Announcements") return post.tag === "Announcement";
      if (activeTab === "Doubts & Q/A") return post.tag === "Doubt";
      if (activeTab === "General Discussion") return post.tag === "General";
      return true;
    })
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));

  const handleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (id: number) => {
    setOpenPostId((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };
  


  const handleSave = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post
      )
    );
  };

  return (
    <div className="w-full">

      <CommunityTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onCreate={() => setShowModal(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5 lg:gap-5 ">

        <div className="space-y-3 min-w-0">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onSave={handleSave}
              onDelete={handleDelete}
              isOpen={openPostId === post.id}
            />
          ))}
        </div>

      <div className="space-y-6 h-fit">
          <TrendingSection />
          <MemberSection />
        </div>
      </div>

      {showModal && (
        <CreatePostModal
          onClose={() => setShowModal(false)}
          onSubmit={(newPost) => {
            setPosts((prev) => [newPost, ...prev]);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
