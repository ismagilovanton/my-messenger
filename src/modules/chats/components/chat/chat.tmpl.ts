export default `
<div class="chat" id="chat-{{id}}">
     <div class="chat__avatar">
     <img src="{{avatar}}">
     </div>
     
     <div class="chat__info">
        <div class="chat__info--title">
            <div class="name">{{title}}</div>
            <div class="date">{{last_message.time }}</div>
        </div>
        <div class="chat__info--content">
            <div class="message">
            
                {{#if last_message.content}}
                   {{last_message.content}}wer
                {{else}}
                   Нет сообщений
                {{/if}}     
            
            </div>
            <div class="count">{{unread_count}}</div>
        </div>
    </div>
 
</div> 
`;


