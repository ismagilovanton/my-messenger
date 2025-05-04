export default `


<div class="{{class}}__group">
  <input 
    class="field" 
    type="{{type}}" 
    placeholder="{{placeholder}}" 
    name="{{name}}" 
    id="{{name}}"
    value="{{value}}"
    />
  <label 
    class="label"
    for="{{name}}"
  >{{label}}</label>
  {{#if error}}
    <span 
      class="error"
    >
        {{error}}
    </span>
  {{/if}}
</div>

`;

