export default `
<div class="error-content">
    <div class="error-content__message">
        <div class="code">{{code}}</div>
        <div class="message">{{message}}</div>
    </div>
    
    {{#if action}}
    <div class="error-content__action">
        {{{action}}}
    </div>
    {{/if}}
</div>
`;


