import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Heart, MessageCircle, Bookmark, Pin, Trash2 } from 'lucide-react';
import { DirectSend } from 'iconsax-react';
import type { ChatReply } from '../../../../types/chat';
import { useLikeQAPost, useBookmarkQAPost, usePostQAReply, useDeleteQAPost } from '../../../../hooks/chat/useQA';

interface CourseQACardProps {
  id: number;
  courseId: number | string;
  batchName: string;
  studentName: string;
  role: string;
  avatar: string;
  timeAgo: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  isPinned?: boolean;
  replies?: ChatReply[];
  isBookmarked?: boolean;
  isLiked?: boolean;
  privacy?: 'public' | 'private';
  isPrivate?: boolean;
  file?: string | null;
  isOwner?: boolean;
  onDelete?: () => void;
}

const CourseQACard: React.FC<CourseQACardProps> = ({
  id,
  courseId,
  batchName,
  studentName,
  role,
  timeAgo,
  title,
  description,
  likes,
  comments,
  isPinned,
  replies = [],
  isBookmarked,
  isLiked,
  privacy = 'public',
  isPrivate,
  file,
  isOwner,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const toggleLikeMutation = useLikeQAPost();
  const toggleBookmarkMutation = useBookmarkQAPost();
  const replyMutation = usePostQAReply();
  const deleteMutation = useDeleteQAPost();

  const handleLike = () => {
    toggleLikeMutation.mutate({ courseId, batchName, questionId: id });
  };

  const handleBookmark = () => {
    toggleBookmarkMutation.mutate({ courseId, batchName, questionId: id });
  };

  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newComment.trim()) return;
    replyMutation.mutate({ courseId, batchName, questionId: id, content: newComment.trim() });
    setNewComment('');
  };

  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : "??";
  };


  return (
    <div className="bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#2C2C2C] rounded-[10px] p-3 relative w-full flex flex-col gap-1">

      {isOwner && (
        <button
          onClick={() => setShowDeletePopup(true)}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      {showDeletePopup && createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] text-[#333] dark:text-white rounded-2xl shadow-xl w-[450px] h-[150px] p-6">

            <h3 className="text-lg font-semibold mb-4 text-center">
              "Are you sure?"
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-5 py-2 rounded-full bg-gray-200 dark:bg-[#2C2C2C] hover:bg-gray-300 dark:hover:bg-[#3A3A3A]"
              >
                Cancel
            </button>

              <button
                onClick={() => {
                  deleteMutation.mutate({ courseId, batchName, questionId: id });
                  setShowDeletePopup(false);
                }}
                className="px-5 py-2 rounded-full bg-orange-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* PINNED LABEL & PRIVATE BADGE */}
      <div className="absolute top-4 right-10 flex flex-col items-end gap-1">
        {isPinned && (
          <div className="flex items-center gap-1 text-[#626262] dark:text-[#CFCFCF] text-xs">
            <Pin className="w-3 h-3" />
            <span>Instructor Pinned Message</span>
          </div>
        )}
        {isPrivate && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded border border-blue-100 dark:border-blue-800">
            <span>PRIVATE</span>
          </div>
        )}
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="w-[41px] h-[41px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[16px] font-bold">
          {getInitials(studentName)}
        </div>
        <div>
          <h3 className="text-[16px] font-semibold text-[#333333] dark:text-white">
            {studentName}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#EF7A02] font-medium">
              {role}
            </span>
            <span className="text-[12px] text-[#989898]">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-[17px] text-[#333333] font-bold dark:text-white">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-[14px] font-medium text-[#626262] dark:text-[#CFCFCF] leading-relaxed">
        {description}
      </p>

      {/* FILE IMAGE */}
      {file && (
        <div className="mt-3 flex justify-center">
          <div
            className="relative w-full cursor-pointer group"
            onClick={() => setPreviewOpen(true)}
          >
            <img
              src={file}
              alt="Uploaded file"
              className="w-full h-56 object-cover object-top rounded-xl border-2 border-dashed border-[#E2E8ED] dark:border-[#2C2C2C]"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-xl flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                Click to view full image
              </span>
            </div>
          </div>
        </div>
      )}

      {/* REPLIES */}
      {replies.map((reply) => (
        <div key={reply.id} className="ml-5 pl-4 border-l-2 border-[#EF7A02] flex flex-col gap-2 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-[35px] h-[35px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[14px] font-bold">
              {getInitials(reply.author.name)}
            </div>
            <div>
              <h4 className="text-[15px] font-semibold text-[#333333] dark:text-white">
                {reply.author.name}
              </h4>
              <div className="flex gap-2 text-xs text-[#989898]">
                <span className="px-2 py-0.5 bg-[#E0FDFE] text-[#00A3FF] rounded">
                  {reply.author.role}
                </span>
                <span>{new Date(reply.created_at).toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p className="text-[14px] text-[#626262] dark:text-[#CFCFCF] leading-relaxed">
            {reply.content}
          </p>
        </div>
      ))}

      {/* PRIVACY BADGE */}
      <div>
       <div className="inline-flex items-center px-3 py-1 border border-[#333333] dark:border-[#555] text-[#333] dark:text-white rounded-full">
          <span className="text-[12px] font-medium capitalize">
            {privacy}
          </span>
        </div>
      </div>

      <div className="h-px mt-1 bg-[#E2E8ED] dark:bg-[#2C2C2C] -mx-3.5" />

      {previewOpen && file && createPortal(
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewOpen(false)}
        >
          <img
            src={file}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>,
        document.body
      )}

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-6">

          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm ${isLiked ? 'text-orange-500 font-bold' : 'text-gray-500'}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-semibold">{likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-semibold">{comments}</span>
          </button>
        </div>

        <button
          onClick={handleBookmark}
          className={`${isBookmarked ? 'text-[#EF7A02]' : 'text-gray-400'}`}
        >
          <Bookmark
            className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
          />
        </button>
      </div>

      {/* COMMENTS */}
      {showComments && (
        <div className="flex flex-col gap-4 mt-1">
          <div className="h-px bg-[#E2E8ED] -mx-3.5" />
          <h5 className="text-[16px] font-semibold text-[#333] dark:text-white">Comments</h5>

          <form onSubmit={handleAddComment} className="flex gap-3 items-center">
            <div className="w-[35px] h-[35px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[14px] font-bold">
              PS
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-[#F5F5F5] dark:bg-[#2A2A2A] border border-[#D2D2D2] dark:border-[#444] text-[#333] dark:text-white rounded-full py-2 px-4 text-[14px] focus:outline-none focus:border-[#EF7A02] pr-10"              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EF7A02]"
              >
                <DirectSend size="20" variant="Bold"  color="currentColor" />
              </button>
            </div>
          </form>

          {replies.length > 0 ? (
            replies.map((reply) => (
              <div key={reply.id} className="flex gap-3">
                <div className="w-[35px] h-[35px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[14px] font-bold">
                  {getInitials(reply.author.name)}
                </div>
                <div>
                  <h4 className="font-bold text-[#333] dark:text-white">{reply.author.name}</h4>
                  <p className="text-[14px] text-[#626262] dark:text-[#CFCFCF]">
                    {reply.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[14px] text-[#989898] italic">
              No comments yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseQACard;
