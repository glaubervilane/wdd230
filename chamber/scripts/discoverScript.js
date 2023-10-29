document.addEventListener("DOMContentLoaded", function () {
    const visitMessage = document.querySelector(".visit-message");
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const currentTime = new Date();
        const lastVisitTime = new Date(parseInt(lastVisit));
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
        }

        // Populate the last visit card
        const lastVisitInfo = document.getElementById("lastVisitInfo");
        lastVisitInfo.textContent = `You last visited ${daysDifference} day${daysDifference > 1 ? 's' : ''} ago.`;
    }

    // Save the current visit timestamp to localStorage
    localStorage.setItem("lastVisit", Date.now().toString());
});
