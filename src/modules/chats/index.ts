import Handlebars from "handlebars";
import template from "./chats.tmpl";
import './chats'
import "./chats.scss";

export interface Chat {
  id: number
  img: string;
  name: string;
  message: string;
  date: string;
  count: number;
}

interface ChatsComponentProps {
  chats: Array<Chat>;
}

import { ChatComponent } from "./components/chat";

Handlebars.registerPartial("chat", ChatComponent);

export function ChatsComponent(props: ChatsComponentProps) {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(props);
}
