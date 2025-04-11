export default `

<div class="error-content">
    <div class="error-content__message">
        <div class="code">{{this.code}}</div>
        <div class="message">{{this.message}}</div>
    </div>
    
    <div class="error-content__action">

    {{>button-text id="error-back-button" title=this.action}}
       
    </div>
</div>
`;

