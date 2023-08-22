export function hideLoadingSpinner() {
   if (document.querySelector('.loading-spinner')) {
      document.querySelector('.loading-spinner').remove();
   }
}

export function showLoadingSpinner() {
   const loadingSpinner = document.createElement('div');
   loadingSpinner.innerHTML = `
       <div class="sp sp-circle"></div>
    `;
   loadingSpinner.classList.add('loading-spinner');
   if (document.querySelector('app-view')) {
      document.querySelector('form').appendChild(loadingSpinner);
   } else {
      document.querySelector('body').appendChild(loadingSpinner);
   }
}
