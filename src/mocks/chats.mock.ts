import { Chat } from "../modules/chats";

const dateConfig: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export const chatsMock: Array<Chat> = [
  {
    id: 1,
    img: "typescript.svg",
    name: "Chat",
    message: "Message",
    date: new Date().toLocaleString("en-US", dateConfig),
    count: 5,
  },
  {
    id: 2,
    img: "chat.png",
    name: "Chat",
    message: "Message",
    date: new Date().toLocaleString("en-US", dateConfig),
    count: 5,
  },
  {
    id: 3,
    img: "chat.png",
    name: "Chat",
    message: "Message",
    date: new Date().toLocaleString("en-US", dateConfig),
    count: 5,
  },
  {
    id: 4,
    img: "chat.png",
    name: "Chat",
    message: "Message",
    date: new Date().toLocaleString("en-US", dateConfig),
    count: 5,
  },
];
