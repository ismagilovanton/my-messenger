export default `

<div class="feed">

        {{#if selectedChat}}
                {{{header}}}
                {{{messages}}}
                {{{input}}}
        {{else}}
                <h1>Select chat in sidebar</h1>
        {{/if}}


</div>

`;

