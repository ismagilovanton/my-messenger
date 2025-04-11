import Handlebars from "handlebars";

import "./settings.scss";

import template from "./settings.tmpl.ts";

interface SettingsPageProps {
  body: string;
}

export function SettingsLayout(props: SettingsPageProps): string {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(props);
}
