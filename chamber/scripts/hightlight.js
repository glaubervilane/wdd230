document.addEventListener("DOMContentLoaded", function () {
  var currentPage = location.pathname.split("/").pop();

  // Remove the leading './' from the filename
  currentPage = currentPage.replace("./", "");

  // Find the corresponding navigation link and add the "current" class
  var navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("current");
    }
  });
});