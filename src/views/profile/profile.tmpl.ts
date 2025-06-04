
export default `
    <form class="profile">

       {{{profileAvatar}}}

        <div class="profile__name">
            {{user.display_name}}
        </div>

        <div class="profile__form">

          {{{form}}}

        </div>

        
        <div class="profile__actions list">

       
            {{{changeData}}}
            {{{changePassword}}}
            {{{button}}}
        
        
        </div>
    </form>


    </div>

`;



