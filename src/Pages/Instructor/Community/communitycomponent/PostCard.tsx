import { useState, useEffect } from "react";
import { Heart, MessageCircle, Bookmark, Pin, File, Trash2 } from "lucide-react";
import { DirectSend } from "iconsax-react";
import type { Post } from "../types/post";

interface Props {
  post: Post;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onSave: (id: number) => void;
  onDelete?: (id: number) => void;
  onPin: (id: number) => void;
  isOpen: boolean;
  isMyPost?: boolean;
}

const PostCard = ({
  post,
  onLike,
  onComment,
  onSave,
  onDelete,
  onPin,
  isOpen,
}: Props) => {

  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!post.file) return;
    const objectUrl = URL.createObjectURL(post.file);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [post.file]);

  const handleAddComment = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newComment.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "You",
        role: "Instructor",
        time: "Just now",
        text: newComment,
      },
    ]);

    setNewComment("");
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 space-y-2">

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {post.author[0]}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium">{post.author}</p>

            <div className="flex items-center justify-between py-1 flex-wrap gap-2">
              <div className="flex items-center gap-1 text-xs">
                <span className="px-2 font-medium text-orange-600 bg-orange-100 rounded-full">
                  {post.role}
                </span>
                <span className="text-gray-400 ml-1">{post.time}</span>
              </div>

              <div className="flex items-center gap-2">

                {/* Pin Button */}
                <button
                  onClick={() => onPin(post.id)}
                  className="flex items-center gap-1 text-xs border border-gray-200 rounded px-2 py-1 hover:bg-orange-50"
                >
                  <Pin
                    size={14}
                    className={
                      post.pinned
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-500"
                    }
                  />
                </button>

                {post.role === "Instructor" && onDelete && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-medium">{post.title}</p>
        <p className="text-sm text-gray-500">{post.description}</p>

        {/* File Preview */}
        {post.file && (
          <div className="mt-3">
            {post.file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(post.file)}
                alt="Post upload"
                className="max-h-60 w-full object-cover rounded-lg border"
              />
            ) : (
              <div className="flex items-center gap-2 text-sm text-orange-500">
                <File />
                <span>{post.file.name}</span>
              </div>
            )}
          </div>
        )}

        {/* Tag */}
        <span className="inline-block text-xs border border-gray-300 px-2 py-1 rounded-full">
          {post.tag}
        </span>

        <hr className="border-gray-300/70 my-2" />

        {/* Actions */}
        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
          <div className="flex gap-6 text-orange-500">

            <button
              onClick={() => onLike(post.id)}
              className="flex items-center gap-1"
            >
              <Heart
                size={16}
                className={post.liked ? "fill-orange-500 text-orange-500" : ""}
              />
              {post.likes}
            </button>

            <button
              onClick={() => onComment(post.id)}
              className="flex items-center gap-1"
            >
              <MessageCircle size={16} />
              {comments.length}
            </button>
          </div>

          <button
            onClick={() => onSave(post.id)}
            className="flex items-center gap-1 text-orange-500"
          >
            <Bookmark
              size={16}
              className={post.saved ? "fill-orange-500" : ""}
            />
            {post.saved ? "Saved" : "Save"}
          </button>
        </div>

        {/* Comments Section */}
        {isOpen && (
          <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">

            <p className="text-sm font-medium">Comments</p>

            <form
              onSubmit={handleAddComment}
              className="flex gap-3 items-center"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
                Y
              </div>

              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 px-4 text-sm text-gray-800 focus:outline-none focus:border-orange-500 pr-10"
                />

                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
                >
                  <DirectSend size="18" variant="Bold" />
                </button>
              </div>
            </form>

            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm">
                  {c.author[0]}
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {c.author}
                    <span className="text-xs text-orange-500 ml-2">
                      {c.role} · {c.time}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 space-y-4 shadow-xl animate-fadeIn">
            <h3 className="font-semibold text-lg">Delete Post?</h3>
            <p className="text-sm text-gray-500">
              "Are you sure you want to delete this post?"
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDelete?.(post.id);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
