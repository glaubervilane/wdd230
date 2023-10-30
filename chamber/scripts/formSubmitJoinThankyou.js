// Get the form element
const form = document.getElementById('joinForm');

// Attach an event listener to the form's submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from actually submitting

  // Capture form data
  const formData = new FormData(form);

  // Construct the URL for "thankyou.html" with the parameters
  const url = new URL("thankyou.html", window.location);
  for (const [key, value] of formData) {
    url.searchParams.set(key, value);
  }

  // Redirect to the "thankyou.html" page
  window.location.href = url.href;
});
