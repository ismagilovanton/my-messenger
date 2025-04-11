import Handlebars from 'handlebars';

import template from "./chat-feed-header.tmpl.ts";
import './chat-feed-header.scss'

export function ChatFeedHeaderComponent(props: any) {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(props);
}
