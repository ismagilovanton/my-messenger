import Handlebars from "handlebars";

import "./style.scss";

import ButtonTmpl from "../templates/button.tmpl";
import InputTmpl from "../templates/input.tmpl.ts";
import PlaceholderTmpl from "../templates/placeholder.tmpl.ts";
import ButtonTextTmpl from "../templates/button-text.tmpl.ts";

Handlebars.registerPartial("button-main", ButtonTmpl);
Handlebars.registerPartial("input", InputTmpl);
Handlebars.registerPartial("placeholder", PlaceholderTmpl);
Handlebars.registerPartial('button-text', ButtonTextTmpl)

Handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});
