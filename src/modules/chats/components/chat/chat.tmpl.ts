export default `
<div class="chat" id="chat-{{id}}">
     <div class="chat__avatar">
     </div>
     
     <div class="chat__info">
        <div class="chat__info--title">
            <div class="name">{{name}}</div>
            <div class="date">{{date}}</div>

        </div>
        <div class="chat__info--content">
            <div class="message">{{message}}</div>
            <div class="count">{{count}}</div>
        </div>
    </div>
 
</div> 
`;

