document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.modal');
  let closeModalBtn = document.querySelector('.close-btn');
  let detailsBtns = document.querySelectorAll('.details-btn');

  function setupEventListeners() {
    detailsBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const rentalType = btn.getAttribute('data-rental-type');
        const details = rentalDetails[rentalType];

        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
          <img src="${details.image}" alt="${details.name}">
          <h2>${details.name}</h2>
          <p>${details.description}</p>
        `;

        modal.style.display = 'block';
      });
    });

    closeModalBtn.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Check if elements are present, wait for them to be added if not
  if (!modal || !closeModalBtn || !detailsBtns.length) {
    const observer = new MutationObserver(function () {
      closeModalBtn = document.querySelector('.close-btn');
      detailsBtns = document.querySelectorAll('.details-btn');
      if (modal && closeModalBtn && detailsBtns.length) {
        observer.disconnect();
        setupEventListeners();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    setupEventListeners();
  }
});

// Sample rental details object (replace with your actual data)
const rentalDetails = {
  type1: {
    name: 'Rental Type 1',
    image: './images/honda-metro.jpg',
    description: 'Details about Honda Metro Scooter.'
  },
  type2: {
    name: 'Rental Type 2',
    image: './images/honda-dio.jpg',
    description: 'Details about Honda Dio Scooter.'
  },
};
