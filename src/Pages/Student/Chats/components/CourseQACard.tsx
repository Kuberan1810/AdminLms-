import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, Pin } from 'lucide-react';
import { DirectSend } from 'iconsax-react';

interface Reply {
    instructorName: string;
    role: string;
    avatar: string;
    timeAgo: string;
    content: string;
}

interface Comment {
    userName: string;
    role: string;
    avatar: string;
    timeAgo: string;
    content: string;
}

interface CourseQACardProps {
    id: number;
    studentName: string;
    role: string;
    avatar: string;
    timeAgo: string;
    title: string;
    description: string;
    likes: number;
    comments: number;
    isPinned?: boolean;
    reply?: Reply;
    allComments?: Comment[];
    isBookmarked?: boolean;
    privacy?: 'public' | 'private';
    file?: string | null;
}

const CourseQACard: React.FC<CourseQACardProps> = ({
    studentName,
    role,
    timeAgo,
    title,
    description,
    likes,
    comments,
    isPinned,
    reply,
    allComments = [],
    isBookmarked: initialIsBookmarked,
    privacy = 'public',
    file
}) => {

    const [localLikes, setLocalLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);
    const [localIsBookmarked, setLocalIsBookmarked] = useState(initialIsBookmarked || false);
    const [showComments, setShowComments] = useState(false);
    const [localCommentsList, setLocalCommentsList] = useState<Comment[]>(allComments);
    const [newComment, setNewComment] = useState('');
    const [localCommentCount, setLocalCommentCount] = useState(comments);
    const [previewOpen, setPreviewOpen] = useState(false);

    const handleLike = () => {
        setLocalLikes(prev => isLiked ? prev - 1 : prev + 1);
        setIsLiked(!isLiked);
    };

    const handleBookmark = () => {
        setLocalIsBookmarked(!localIsBookmarked);
    };

    const handleComment = () => {
        setShowComments(!showComments);
    };

    const handleAddComment = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newComment.trim()) return;

        const commentToAdd: Comment = {
            userName: "Philip Stanton",
            role: "Student",
            avatar: "",
            timeAgo: "Just now",
            content: newComment.trim()
        };

        setLocalCommentsList(prev => [...prev, commentToAdd]);
        setLocalCommentCount(prev => prev + 1);
        setNewComment('');
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const isImageFile = (url: string) => {
        return url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
    };

    return (
        <div className="bg-white border border-[#E2E8ED] rounded-[10px] p-[10px] relative w-full flex flex-col gap-[10px]" style={{ fontFamily: 'Urbanist, sans-serif' }}>

            {isPinned && (
                <div className="absolute top-[10px] right-[10px] flex items-center gap-1 text-[#626262] text-[12px]">
                    <Pin className="w-3 h-3" />
                    <span>Pinned by Instructor</span>
                </div>
            )}

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-[41px] h-[41px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[16px] font-bold">
                    {getInitials(studentName)}
                </div>
                <div>
                    <h3 className="text-[16px] font-semibold text-[#333333]">{studentName}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-[12px] text-[#EF7A02] font-medium">{role}</span>
                        <span className="text-[12px] text-[#989898]">{timeAgo}</span>
                    </div>
                </div>
            </div>

            <h3 className="text-[17px] text-[#333333] font-bold">
                {title}
            </h3>

            <p className="text-[13px] md:text-[14px] font-medium text-[#626262] leading-tight">
                {description}
            </p>

            {file && (
                <div className="mt-3 flex justify-center">
                    <div
                        className="relative w-full cursor-pointer group"
                        onClick={() => setPreviewOpen(true)}
                    >
                        <img
                            src={file}
                            alt="Uploaded file"
                            className="w-full h-56 object-cover object-top rounded-xl border-2 border-dashed border-[#E2E8ED]"
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


            {/* Instructor Reply */}
            {reply ? (
                <div className="ml-5 pl-4 border-l-[2px] border-[#EF7A02] flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-[35px] h-[35px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[14px] font-bold">
                            {getInitials(reply?.instructorName || '')}
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-[16px] font-semibold text-[#333333] leading-tight">
                                {reply?.instructorName}
                            </h4>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] px-2 py-0.5 bg-[#E0FDFE] text-[#00A3FF] rounded-[4px] font-medium">
                                    {reply?.role}
                                </span>
                                <span className="text-[10px] text-[#989898]">
                                    {reply?.timeAgo}
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="text-[14px] text-[#626262] font-medium leading-relaxed">
                        {reply?.content}
                    </p>
                </div>
            ) : null}

            {/* Privacy */}
            <div>
                <div className="inline-flex items-center px-3 py-1 border border-[#333333] rounded-full">
                    <span className="text-[12px] font-medium capitalize">
                        {privacy}
                    </span>
                </div>
            </div>

            <div className="h-[1px] bg-[#E2E8ED] -mx-[10px]" />

            {previewOpen && file && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={() => setPreviewOpen(false)}
                >
                    <img
                        src={file}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-xl"
                    />
                </div>
            )}
            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-2 ${isLiked ? 'text-orange-500' : 'text-[#626262]'}`}
                    >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span className="text-[14px] font-semibold">{localLikes}</span>
                    </button>

                    <button
                        onClick={handleComment}
                        className="flex items-center gap-2 text-[#626262]"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-[14px] font-semibold">{localCommentCount}</span>
                    </button>
                </div>

                <button
                    onClick={handleBookmark}
                    className="text-[#EF7A02] cursor-pointer"
                >
                    <Bookmark className={`w-5 h-5 ${localIsBookmarked ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Comments */}
            {showComments && (
                <div className="flex flex-col gap-4 mt-4">
                    <div className="h-[1px] bg-[#E2E8ED] -mx-[10px]" />
                    <h5 className="text-[16px] font-semibold">Comments</h5>

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
                                className="w-full bg-[#F5F5F5] border border-[#D2D2D2] rounded-full py-2 px-4 text-[14px] focus:outline-none focus:border-[#EF7A02] pr-10"
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#EF7A02]"
                            >
                                <DirectSend size="20" variant="Bold" />
                            </button>
                        </div>
                    </form>

                    {localCommentsList.length > 0 ? (
                        localCommentsList.map((comment, index) => (
                            <div key={index} className="flex gap-3">
                                <div className="w-[35px] h-[35px] rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-[14px] font-bold">
                                    {getInitials(comment.userName)}
                                </div>
                                <div>
                                    <h4 className="font-bold">{comment.userName}</h4>
                                    <p className="text-[14px] text-[#626262]">{comment.content}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[14px] text-[#989898] italic">No comments yet.</p>
                    )}
                    
                </div>
                
                
            )}
        </div>
        
    );
};

export default CourseQACard;
