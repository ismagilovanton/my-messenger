
import Picture from '../../../public/icons/picture.svg';

export default `

    <form class="chat-settings">

        <div class="chat-settings__avatar">
            <img src="${Picture}" alt="avatar" class="icon">
            <input type="hidden" name="avatar"></input>
        </div>
        
        <div class="chat-settings__name">Настройки чата</div>

        <div class="chat-settings__invite">
            <h3>Добавить пользователя</h3>

            {{{form}}}
        </div>
        


        <div class="chat-settings__list">

            {{{users}}}

        </div>

        {{{backButton}}}

        {{{removeButton}}}

    </form>
    
`;
