import Picture from "../../../public/icons/picture.svg";

export default `

    <div class="profile">

        <div class="profile__avatar">
            <img src="${Picture}" alt="avatar" class="icon">
            <input type="hidden" name="avatar"></input>
        </div>

        <div class="profile__name">Иван</div>

        <div class="profile__form">

            {{> input-inline type="email" label="Почта" value="pochta@yandex.ru" name="email"}}
            {{> input-inline type="text" label="Логин" value="ivanivanov" name="login"}}
            {{> input-inline type="text" label="Имя" value="Иван" name="first_name"}}
            {{> input-inline type="text" label="Фамилия" value="Иванов" name="second_name"}}
            {{> input-inline type="text" label="Имя в чате" value="Иван" name="display_name"}}
            {{> input-inline type="phone" label="Телефон" value="+7 (909) 967 30 30" name="phone"}}
            {{> input-inline type="password" label="Старый пароль" value="12345678" name="oldPassword"}}
            {{> input-inline type="password" label="Новый пароль" value="12345678" name="newPassword"}}


        </div>

        <div class="profile__actions list">

            <div class="profile__actions--item list__item ">
                Изменить данные
            </div>

            <div class="profile__actions--item list__item">
                Изменить пароль
            </div>

            <div class="profile__actions--item danger list__item" href="/signin">
                <a href="/signin">
                    Выйти
                </a>
            </div>
        </div>

    </div>


    </div>

`;

