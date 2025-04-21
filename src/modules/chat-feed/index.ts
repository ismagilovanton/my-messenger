import Handlebars from 'handlebars'

import './chat-feed.scss'

import template from './chat-feed.tmpl'

import {ChatFeedHeaderComponent} from "./components/chat-feed-header";
import {ChatFeedMessagesComponent} from "./components/chat-feed-messages";
import {ChatFeedInputComponent} from "./components/chat-feed-input";

export function ChatFeedComponent() {
    const compiledTemplate = Handlebars.compile(template);


    return compiledTemplate({
        header: ChatFeedHeaderComponent({}),
        messages: ChatFeedMessagesComponent(),
        input: ChatFeedInputComponent({}),
    });
}
