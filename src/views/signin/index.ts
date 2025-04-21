import Handlebars from "handlebars";

import { AuthLayout } from "../../layouts/auth";

import "./signin.scss";
import "../../static/style.scss";
import "../../static/index.ts"

import template from "./signin.tmpl.ts";

export function SignInView() {
  const compiledView = Handlebars.compile(template);
  const compiledLayout = AuthLayout;

  return compiledLayout({
    body: compiledView({}),
  });
}

function renderPage() {
  const root = document.querySelector("#app");

  if (!root) return;

  root.innerHTML = SignInView();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage();
});

