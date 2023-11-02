document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Get values from the URL query parameters
  const username = urlParams.get("username");
  const email = urlParams.get("email");
  const pageRating = urlParams.get("pageRating");
  const timestamp = urlParams.get("timestamp");

  // Populate the corresponding elements
document.getElementById("username").textContent = username;
document.getElementById("email").textContent = email;
document.getElementById("pageRating").textContent = pageRating;
document.getElementById("timestamp").textContent = timestamp;
});


function updateRatingValue(value) {
  document.getElementById("ratingValue").textContent = value;
}

function addQueryParameters(event) {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const pageRating = document.getElementById("pageRating").value;

  document.getElementById("usernameHidden").value = username;
  document.getElementById("emailHidden").value = email;
  document.getElementById("pageRatingHidden").value = pageRating;
}
