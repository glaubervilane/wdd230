document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggle-faq');
  const faqSection = document.querySelector('.faq-section');

  toggleButton.addEventListener('click', function () {
    faqSection.classList.toggle('active');
  });
});