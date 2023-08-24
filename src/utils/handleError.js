export default function handleError(error) {
   const searchInput = document.querySelector('.search-input');
   if (searchInput) {
      searchInput.setCustomValidity(error.message);
      searchInput.reportValidity();
      searchInput.setCustomValidity('');
   } else {
      document.querySelector('body').innerHTML = `
         <div class="error-message"><i class="fa-solid fa-triangle-exclamation"></i> ${error.message}</div>`;
   }
}
