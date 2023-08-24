export default function handleError(error) {
   const searchInput = document.querySelector('.search-input');
   if (searchInput) {
      searchInput.setCustomValidity(error.message);
      searchInput.reportValidity();
      searchInput.setCustomValidity('');
   } else {
      document.querySelector('.loading-msg').textContent = error.message;
   }
}
