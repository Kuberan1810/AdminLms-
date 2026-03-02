export interface Comment {
  id: number;
  author: string;
  role: string;
  time: string;
  text: string;
}

export interface Post {
  id: number;
  author: string;
  role: string;
  title: string;
  description: string;
  tag: string;
 category?: string;
  time: string;

  likes: number;
  liked:boolean;
  saved: boolean;
  isMine: boolean;

  isInstructor: boolean;
  isPinned: boolean;
  pinned?: boolean;
  comments: Comment[]; 
  file?: File; 
}
