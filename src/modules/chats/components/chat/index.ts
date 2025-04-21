import {Chat} from "../..";

import Handlebars from "handlebars";
import template from "./chat.tmpl";
import "./chat.scss";

import {selectChat} from "./chat";

export function ChatComponent(chat: Chat) {
  const compiledTemplate = Handlebars.compile(template);

  const onMounted = () => {
    const chatElement = document.getElementById(`chat-${chat.id}`);

    chatElement?.addEventListener("click", () => selectChat(chat.id));
  };

  // Add event listener to initialize sidebar after DOM is loaded
  if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", onMounted);
  }

  return compiledTemplate(chat);
}

