export type Reply = {
  id: string;
  sender: "me" | "student";
  role: "Instructor" | "Student";
  text?: string;
  name: string;
  image?: string;
  time: string;
  likes?: number;
  liked?: boolean;
  saved?: boolean;
  pinned?: boolean;
};

export type Message = {
  id: string;
  sender: "me" | "student";
  name: string;
  role: "Instructor" | "Student";
  text?: string;
  image?: string;
  title?: string;
  time: string;
  likes?: number;
  liked?: boolean;
  pinned?: boolean;
  saved?: boolean;
  replies?: Reply[];
};

export type IndividualChat = {
  id: string;
  type: "individual";
  name: string;
  messages: Message[];
};

export type GroupChat = {
  id: string;
  type: "group";
  name: string;
  members: string[];
  messages: Message[];
};

export type Chat = IndividualChat | GroupChat;
