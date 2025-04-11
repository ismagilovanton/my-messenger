import Handlebars from "handlebars";

import template from "./home.tmpl";

import "../../static/style.scss";
import "./home.scss";

import { MainLayout } from "../../layouts/main";

import { ChatFeedComponent } from "../../modules/chat-feed";


Handlebars.registerPartial("chat-feed", ChatFeedComponent);

export function HomeView() {
  const compiledTemplate = Handlebars.compile(template);
  const compiledLayout = MainLayout;

  return compiledLayout({
    body: compiledTemplate,
  });
}

function renderPage() {
  const root = document.querySelector("#app");

  if (!root) return;

  root.innerHTML = HomeView();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
