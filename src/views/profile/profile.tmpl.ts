import Picture from '../../../public/icons/picture.svg';

export default `

    <form class="profile">

        <div class="profile__avatar">
            <img src="${Picture}" alt="avatar" class="icon">
            <input type="hidden" name="avatar"></input>
        </div>

        <div class="profile__name">Иван</div>

        <div class="profile__form">

          {{{form}}}

        </div>

        <div class="profile__actions list">

            <div class="profile__actions--item list__item">
                {{{changeData}}}
            </div>

            <div class="profile__actions--item list__item">
                {{{changePassword}}}
            </div>

            <div class="profile__actions--item danger list__item" href="/signin">
                <a href="/signin">
                    Выйти
                </a>
            </div>
        </div>

    </form>


    </div>

`;

