const gridButton = document.querySelector("#grid");
  const listButton = document.querySelector("#list");
  const gridDisplay = document.querySelector(".grid");
  const listDisplay = document.querySelector(".list");

  const dataURL = "https://glaubervilane.github.io/wdd230/chamber/data/members.json";

  let currentView = "grid";

  // Load and display members based on the current view
  function displayMembers(members) {
    if (currentView === "grid") {
      gridDisplay.innerHTML = "";
      members.forEach((member) => {
        const gridItem = document.createElement("section");
        gridItem.innerHTML = `
          <img src="${member.image}" alt="${member.name}" />
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <a href="${member.website}" target="_blank">Details</a>
        `;
        gridDisplay.appendChild(gridItem);
      });
    } else {
      listDisplay.innerHTML = "";
      members.forEach((member) => {
        const listItem = document.createElement("section");
        listItem.innerHTML = `
          <img src="${member.image}" alt="${member.name}" />
          <h3>${member.name}</h3>
          <p>Address: ${member.address}</p>
          <p>Phone: ${member.phone}</p>
          <p>Membership Level: ${member.membershipLevel}</p>
          <p>${member.otherInfo}</p>
          <a href="${member.website}" target="_blank">Details</a>
        `;
        listDisplay.appendChild(listItem);
      });
    }
  }

  async function getMembers() {
    try {
      const response = await fetch(dataURL);
      const data = await response.json();
      displayMembers(data.members);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Initial display
  getMembers();

  // Event listeners for switching views
  gridButton.addEventListener("click", () => {
    currentView = "grid";
    displayMembers(data.members);
  });

  listButton.addEventListener("click", () => {
    currentView = "list";
    displayMembers(data.members);
  });