import Handlebars from "handlebars";

import template from "./sidebar.tmpl";

import './sidebar.scss'

import { ChatsComponent } from "../../../../modules/chats";

import { chatsMock } from "../../../../mocks/chats.mock";

Handlebars.registerPartial("chatsList", ChatsComponent);

export function Sidebar() {
  const compiledTemplate = Handlebars.compile(template);
  const html = compiledTemplate({
    chats: chatsMock,
  });

  return html;
}
