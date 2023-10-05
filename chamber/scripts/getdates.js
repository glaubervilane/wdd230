// getdates.js

const copyrightYear = document.querySelector("#copyright");
copyrightYear.textContent = new Date().getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.textContent = document.lastModified;