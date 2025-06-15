import Picture from '../../../public/icons/picture.svg';
import { API_ENDPOINT } from '../../framework/Fetch';

export default `
<div class="profile__avatar">





    <div class="profile__avatar-wrapper">
      {{#if user.avatar}}
        <img src="${API_ENDPOINT}/resources/{{user.avatar}}" alt="avatar" class="profile__avatar-image">
      {{else}}
        <img src="${Picture}" alt="placeholder" class="profile__avatar-placeholder">
      {{/if}}
      
      <div class="profile__avatar-overlay">
        <label class="profile__avatar-change">
          <input
            id="avatar-input" 
            type="file" 
            class="profile__avatar-input" 
            accept="image/*"
            name="avatar"
          >
          <span>Изменить</span>
        </label>
       
      </div>
    </div>
</div>
`;

