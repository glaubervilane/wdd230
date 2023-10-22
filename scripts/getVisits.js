// 1. Initialize display element variable
const visitCountDisplay = document.querySelector(".visit-count");

// 2. Get the stored visit count from localStorage or initialize it to 0
let visitCount = Number(localStorage.getItem("visitCount")) || 0;

// 3. Display the visit count
visitCountDisplay.textContent = visitCount;

// 4. Increment the visit count
visitCount++;

// 5. Store the updated visit count in localStorage
localStorage.setItem("visitCount", visitCount);
