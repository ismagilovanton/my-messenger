import Search from '../../../../../public/icons/search.svg';
import ChevronRight from '../../../../../public/icons/chevron-right.svg';

export default `

<div class="sidebar">

    <div class="sidebar__actions">
            <a class="sidebar__actions__item" href="/profile">
                <span>Профиль</span>  
                <img src="${ChevronRight}" alt="chevronRightIcon"/>
            </a>
    </div>
    
    <div class="sidebar__search">
            <img src="${Search}" alt="searchIcon"/>
            <span>Поиск</span>
    </div>

    {{{content}}}
</div>
`;

