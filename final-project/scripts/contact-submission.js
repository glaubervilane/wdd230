document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.querySelector('.contact-form');

  contactForm.addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Redirect to the success page
    window.location.href = 'success.html';
  });
});