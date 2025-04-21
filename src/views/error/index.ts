import Handlebars from "handlebars";

import template from "../../templates/error.tmpl";

import '../../static/style.scss'

import { ErrorLayout } from "../../layouts/error";

interface ErrorViewProps {
  code?: number;
  message?: string;
  action: string;
}

export function ErrorView(props: ErrorViewProps) {
  const compiledView = Handlebars.compile(template);
  const compiledLayout = ErrorLayout;

  return compiledLayout({
    body: compiledView(props),
  });
}

function renderPage() {
  const root = document.querySelector("#app");

  if (!root) return;

  root.innerHTML = ErrorView({
    code: 500,
    message: "Мы уже фиксим",
    action: "Назад к чатам",
   
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});

