
// Get the banner and close button elements
const meetAndGreetBanner = document.getElementById('meetAndGreetBanner');
const closeBannerBtn = document.getElementById('closeBannerBtn');

// Check if today is Monday, Tuesday, or Wednesday
const today = new Date();
const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
const isShowBannerDay = dayOfWeek >= 1 && dayOfWeek <= 3;

// Display or hide the banner based on the current day
if (isShowBannerDay) {
  meetAndGreetBanner.style.display = 'block';
} else {
  meetAndGreetBanner.style.display = 'none';
}

// Add an event listener to the close button to hide the banner
closeBannerBtn.addEventListener('click', () => {
  meetAndGreetBanner.style.display = 'none';
});
