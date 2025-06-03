
import DotsIcon from '../../../../../public/icons/dots.svg';

export default `

<div class="header">
    <div class="header__info">
        <div class="header__info--avatar"></div>
        <div class="header__info--name">{{{selectedChat.title}}}</div>
    </div>
    <div class="header__actions">
        {{{openUsersList}}}
        <div class="menu">
            <img src="${DotsIcon}" alt="dotsIcon"/>
        </div>
    </div>

    
`;

