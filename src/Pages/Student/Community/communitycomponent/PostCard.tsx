import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Heart, MessageCircle, Bookmark, Pin, File, Trash2 } from "lucide-react";
import type { Post } from "../types/post";

interface Props {
  post: Post;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onSave: (id: number) => void;
  onDelete?: (id: number) => void;
  isOpen: boolean;
}

const PostCard = ({
  post,
  onLike,
  onComment,
  onSave,
  onDelete,
  isOpen,
}: Props) => {
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!post.file) return;

    const url = URL.createObjectURL(post.file);
    setFilePreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [post.file]);

  const handleAddComment = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "You",
      role: "Student",
      time: "Just now",
      text: newComment,
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(post.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl border border-[#F2EEF4] p-4 space-y-3">

        {/* HEADER */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {post.author[0]}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-[#333333]">
                  {post.author}
                </p>

                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full font-medium">
                    {post.role}
                  </span>
                  <span className="text-gray-400">{post.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">

                {post.isPinned && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Pin size={14} className="text-gray-500" />
                    Pinned by instructor
                  </div>
                )}

                {/* DELETE */}
                {post.isMine && onDelete && (
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="text-red-500 hover:text-red-600 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <p className="font-semibold text-[#333333]">
            {post.title}
          </p>
          <p className="text-sm text-[#626262] leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* FILE */}
        {post.file && (
          <div>
            {post.file.type.startsWith("image/") ? (
              <div
                className="relative w-full cursor-pointer group"
                onClick={() => setPreviewOpen(true)}
              >
                <img
                  src={filePreview || ""}
                  alt="Post upload"
                  className="w-full max-h-62 object-cover object-top rounded-xl border border-[#F2EEF4]"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    Click to view full image
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-orange-500 bg-orange-50 p-3 rounded-lg">
                <File size={18} />
                <span>{post.file.name}</span>
              </div>
            )}
          </div>
        )}

        {/* TAG */}
        <span className="inline-block bg-gray-100 text-xs border border-[#F2EEF4] px-2 py-1 rounded-full">
          {post.tag}
        </span>

        <div className="border-t border-[#F2EEF4] " />

        {/* ACTIONS */}
        <div className="flex justify-between text-sm">
          <div className="flex gap-6 text-orange-500">
            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Heart
                size={18}
                className={post.liked ? "fill-orange-500 text-orange-500" : ""}
              />
              {post.likes}
            </button>

            <button
              onClick={() => onComment(post.id)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <MessageCircle size={18} />
              {comments.length}
            </button>
          </div>

          <button
            onClick={() => onSave(post.id)}
            className="flex items-center gap-1 text-orange-500 cursor-pointer"
          >
            <Bookmark
              size={18}
              className={post.saved ? "fill-orange-500" : ""}
            />
            {post.saved ? "Saved" : "Save"}
          </button>
        </div>

        {/* COMMENTS SECTION */}
        {isOpen && (
          <div className="border-t border-[#F2EEF4] pt-3 space-y-2">

            <p className="text-sm font-medium text-gray-800">
              Comments
            </p>

            <form onSubmit={handleAddComment} className="flex gap-3 items-center">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
                Y
              </div>

              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-gray-100 border border-[#F2EEF4] rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-orange-400"
              />
            </form>

            {/* COMMENT LIST */}
            <div className="space-y-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">

                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium shrink-0">
                    {comment.author[0]}
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-[#333333]">
                        {comment.author}
                      </span>

                      <span className="text-orange-500 text-xs font-medium">
                        {comment.role}
                      </span>

                      <span className="text-gray-400 text-xs">
                        · {comment.time}
                      </span>
                    </div>

                    <p className="text-[14px] text-gray-700 mt-1 leading-6">
                      {comment.text}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FULL SCREEN IMAGE PREVIEW */}
      {previewOpen && filePreview && createPortal(
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <img
            src={filePreview}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>,
        document.body
      )}

      {showDeleteModal && createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[100]">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-xl space-y-4">
            <h3 className="text-lg font-semibold text-[#333]">Delete Post?</h3>
            <p className="text-sm text-[#626262]">
              Are you sure you want to delete this post?
            </p>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm rounded-lg border border-[#F2EEF4] hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PostCard;
