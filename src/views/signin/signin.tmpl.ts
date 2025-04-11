export default `

  <div class="auth-wrapper" >
        <h1 class="auth-wrapper__title">Вход</h1>
        <form class="auth-wrapper__form" action="/">
            <div class="form-group">
                {{>input label="Логин" value="ivanivanov" type="text" name="login"}}
            </div>
            <div class="form-group">
                {{>input label="Пароль" value="12345678" type="password" name="password"}}
            </div>
          
             <div class="form-actions">
                {{>button-main title="Вход" name="Вход"}}
                <a href="/signup">Нет аккаунта?</a>
            </div>
        </form>
    </div>
   
`;
