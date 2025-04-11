export default `

<div class="form__group field">
  <input type="{{type}}" class="form__field" placeholder="Name" name="{{name}}" id='name' required value="{{value}}" required/>
  <label for="{{name}}" class="form__label">{{label}}</label>
  {{#if error}}
    <span class="form__error">
        {{error}}
    </span>
  {{/if}}
</div>

`