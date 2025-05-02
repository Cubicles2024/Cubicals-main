window.onload = function() {
  const popup = document.getElementById('popup');
  
  if (popup) { // Ensure the popup element exists before trying to modify it
      setTimeout(() => {
          popup.classList.remove('hidden');
          popup.classList.add('visible');
      }, 4000);

      setTimeout(() => {
          popup.classList.remove('visible');
          popup.classList.add('hidden');
      }, 10000);
  }
};
