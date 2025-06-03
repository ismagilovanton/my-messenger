export default `
<div class="chat" id="chat-{{chat.id}}">
     <div class="chat__avatar">
     <img src="{{chat.avatar}}">
     </div>
     
     <div class="chat__info">
        <div class="chat__info--title">
            <div class="name">{{chat.title}}</div>
            <div class="date">{{chat.last_message.time }}</div>
        </div>
        <div class="chat__info--content">
            <div class="message">
            
                {{#if chat.last_message.content}}
                   {{chat.last_message.content}}wer
                {{else}}
                   Нет сообщений
                {{/if}}     
            
            </div>
            <div class="count">{{chat.unread_count}}</div>
        </div>
    </div>
 
</div> 
`;


