import Handlebars from "handlebars";

import template from './error.tmpl.ts'

import './error.scss'

interface ErrorPageProps {
    body: string
}

export function ErrorLayout(props: ErrorPageProps) {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(props)
}
