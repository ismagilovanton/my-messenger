export default `
    <div class="auth-wrapper">
        <h1 class="auth-wrapper__title">Регистрация</h1>
        {{#if error}}
        <div class="auth-wrapper__error">{{error}}</div>
        {{/if}}
         {{{form}}}
    </div>
`;


