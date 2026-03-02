// import type { Post } from "../types/post";
// import PostCard from "../communitycomponent/PostCard";

// interface Props {
//   posts: Post[];
//   onLike: (id: number) => void;
//   onComment: (id: number) => void;
//   onSave: (id: number) => void;
//   openPostId: number | null;
// }

// const FeedSection = ({
//   posts,
//   onLike,
//   onComment,
//   onSave,
//   openPostId,
// }: Props) => {
//   return (
//     <div className="w-full max-w-3xl mx-auto px-3 sm:px-4 lg:px-0">

//       <div className="space-y-4 sm:space-y-6">

//         {posts.length === 0 ? (
//           <div className="text-center py-10 text-gray-500 text-sm sm:text-base">
//             No posts available.
//           </div>
//         ) : (
//           posts.map((post) => (
//             <PostCard
//               key={post.id}
//               post={post}
//               onLike={onLike}
//               onComment={onComment}
//               onSave={onSave}
//               isOpen={openPostId === post.id}
//             />
//           ))
//         )}

//       </div>

//     </div>
//   );
// };

// export default FeedSection;
