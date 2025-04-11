import Handlebars from "handlebars";

import template from "./profile.tmpl.ts";
import "../../static/index.ts";

import "./profile.scss";

import { SettingsLayout } from "../../layouts/settings";

import inputInlineTmpl from "../../templates/input-inline.tmpl.ts";
Handlebars.registerPartial("input-inline", inputInlineTmpl);

export function ProfileView() {
  const compiledView = Handlebars.compile(template);
  const compiledLayout = SettingsLayout;

  return compiledLayout({
    body: compiledView({}),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app");

  if (!root) return;

  root.innerHTML = ProfileView();
});
