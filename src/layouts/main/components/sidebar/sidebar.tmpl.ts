import Search from '../../../../../public/icons/search.svg';

export default `

<div class="sidebar">

    <div class="sidebar__actions">
           {{{button}}}
    </div>
    
    <div class="sidebar__search">
        <img src="${Search}" alt="searchIcon"/>
        <span>Поиск</span>
    </div>

    {{{content}}}
</div>
`;
