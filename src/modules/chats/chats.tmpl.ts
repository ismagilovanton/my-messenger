export default `
    <ul class="chats">
    
        {{#each chats}}
            <li>
                {{> chat this}}
            </li>
        {{/each}}
    
    </ul>
`;
