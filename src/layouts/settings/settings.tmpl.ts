import ArrowLeft from '../../../public/icons/arrow-left.svg';

export default `
<div class="settings">
        <div class="settings__sidebar">
        
            <a class="settings__sidebar--back" href="/">
               <img src="${ArrowLeft}" alt="arrowLeftIcon" class="icon">
            </a>

        </div>
        <div class="settings__content">
                {{{body}}}
            </div>
        </div>

`;

