document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);

  // Get values from the URL query parameters
  const firstName = urlParams.get("firstName");
  const lastName = urlParams.get("lastName");
  const title = urlParams.get("title");
  const email = urlParams.get("email");
  const phone = urlParams.get("phone");
  const organizationName = urlParams.get("organizationName");
  const membershipLevel = urlParams.get("membershipLevel");
  const description = urlParams.get("description");
  const timestamp = urlParams.get("timestamp");

  // Populate the corresponding elements
  document.getElementById("firstName").textContent = firstName;
  document.getElementById("lastName").textContent = lastName;
  document.getElementById("title").textContent = title;
  document.getElementById("email").textContent = email;
  document.getElementById("phone").textContent = phone;
  document.getElementById("organizationName").textContent = organizationName;
  document.getElementById("membershipLevel").textContent = membershipLevel;
  document.getElementById("description").textContent = description;
  document.getElementById("timestamp").textContent = timestamp;
});
