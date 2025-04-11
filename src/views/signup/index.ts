import Handlebars from "handlebars";

import { AuthLayout } from "../../layouts/auth";

import "./signup.scss";
import "../../static/style.scss";
import "../../static/index.ts";

import template from "./signup.tmpl.ts";

export function SignUpView() {
  const compiledView = Handlebars.compile(template);
  const compiledLayout = AuthLayout;

  return compiledLayout({
    body: compiledView({}),
  });
}

function renderPage() {
  const root = document.querySelector("#app");

  if (!root) return;

  root.innerHTML = SignUpView();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});
