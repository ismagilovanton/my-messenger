export default `
    <div class="auth-wrapper">
        <h1 class="auth-wrapper__title">Регистрация</h1>
        <form class="auth-wrapper__form" action="/">
            <div class="form-group">
                {{>input label="Почта" value="pochta@yandex.ru" type="email" name="email"}}
            </div>
            <div class="form-group">
                {{>input label="Логин" value="ivanivanov" type="text" name="login"}}
            </div>
            <div class="form-group">
              {{>input label="Имя" value="Иван" type="text" name="first_name"}}
            </div>
             <div class="form-group">
              {{>input label="Фамилия" value="Иванов" type="text" name="second_name"}}
            </div>
             <div class="form-group">
              {{>input label="Телефон" value="+7 (909) 967 30 30" type="phone" name="phone"}}
            </div>
             <div class="form-group">
              {{>input label="Пароль" value="12345678" type="password" name="password"}}
            </div>
             <div class="form-group">
              {{>input label="Пароль еще раз" value="12345678" type="repeat_password"}}
            </div>
            
            <div class="form-actions">
                 {{>button-main title="Зарегистрироваться" name="Зарегистрироваться"}}
                <a href="/signin">Войти</a>
            </div>
        </form>
    </div>
`;

