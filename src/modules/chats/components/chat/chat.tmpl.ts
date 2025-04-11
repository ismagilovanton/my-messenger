export default `
<div class="chat" id="chat-{{this.id}}">
     <div class="chat__avatar">
     </div>
     
     <div class="chat__info">
        <div class="chat__info--title">
            <div class="name">{{this.name}}</div>
            <div class="date">{{this.date}}</div>

        </div>
        <div class="chat__info--content">
            <div class="message">{{this.message}}</div>
            <div class="count">{{this.count}}</div>
        </div>
    </div>
 
</div> 
`;

