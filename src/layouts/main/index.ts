import Handlebars from "handlebars";

import template from "./main.tmpl";
import './main.scss'

interface MainLayoutProps {
  body: any;
}

import { Sidebar } from "./components/sidebar";

Handlebars.registerPartial("sidebar", Sidebar);

export function MainLayout(props: MainLayoutProps) {
  const compiledTemplate = Handlebars.compile(template);
  return compiledTemplate(props);
}
