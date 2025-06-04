export default `
    <div class="messages">
        {{#if messages.length}}
            {{#each messages}}
                <div class="message {{#if (eq user_id ../currentUserId)}}message--own{{/if}}">
                    <div class="message__content">{{content}}</div>
                    <div class="message__time">{{time}}</div>
                </div>
            {{/each}}
        {{else}}
            {{{placeholder}}}
        {{/if}}
    </div>
`;


