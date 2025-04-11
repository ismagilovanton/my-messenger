import Handlebars from "handlebars";

import template from './auth.tmpl.ts'

import './auth.scss'

interface AuthLayout {
    body: String
}

export function AuthLayout(props: AuthLayout) {
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(props)
}