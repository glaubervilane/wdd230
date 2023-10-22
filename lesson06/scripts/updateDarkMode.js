const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    // Dark mode is enabled
    body.classList.add('dark-mode');
  } else {
    // Dark mode is disabled
    body.classList.remove('dark-mode');
  }
});
