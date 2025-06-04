import { API_ENDPOINT } from '../../framework/Fetch';

export default `
   <div class="user-card" id="user-{{id}}">
        <div class="user-card__avatar">
            {{#if user.avatar}}
                <img src="${API_ENDPOINT}/resources/{{user.avatar}}" alt="{{user.display_name}}" />
            {{else}}
                <div class="user-card__avatar-placeholder">
                    {{user.first_name.[0]}}{{user.second_name.[0]}}
                </div>
            {{/if}}
        </div>
        <div class="user-card__info">
            <div class="user-card__name">{{user.first_name}} {{user.second_name}}</div>
            <div class="user-card__details">
                <span class="user-card__login">@{{user.login}}</span>
                <span class="user-card__email">{{user.email}}</span>
            </div>
        </div>
        {{#if isOwner}}
            <button class="user-card__remove-btn" data-user-id="{{user.id}}">
                <span class="user-card__remove-icon">×</span>
            </button>
        {{/if}}
    </div>
`;

