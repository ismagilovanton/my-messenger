import Handlebars from 'handlebars';

import './chat-feed-messages.scss'

import template from './chat-feed-messages.tmpl.ts'

export function ChatFeedMessagesComponent() {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({})
}
