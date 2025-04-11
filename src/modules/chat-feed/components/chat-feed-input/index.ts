import Handlebars from 'handlebars'

import template from "./chat-feed-input.tmpl.ts";
import './chat-feed-input.scss'

export function ChatFeedInputComponent(props: any) {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(props);
}