// Rental details object
const rentalDetails = {
  type1: {
    name: 'Honda Metro Scooter',
    image: './images/honda-metro.jpg',
    description: '49cc liquid-cooled single-cylinder four-stroke.'
  },
  type2: {
    name: 'Honda Dio Scooter',
    image: './images/honda-dio.jpg',
    description: '109.51 cc air-cooled engine which produces 7.85 PS @ 8000 rpm of power.'
  },
  type3: {
    name: 'Honda PCX150 Scooter',
    image: './images/honda-pcx.jpg',
    description: '156.9cc liquid-cooled 80º single-cylinder four-stroke.'
  },
  type4: {
    name: 'Honda Pioneer ATV',
    image: './images/honda-pioneer.jpg',
    description: '999cc liquid-cooled longitudinally mounted parallel-twin four-stroke.'
  },
  type5: {
    name: 'Jeep Wrangler 4 doors with a/c',
    image: './images/jeep-wrangler1.jpg',
    description: 'ERC Regular Unleaded V-6, 3.6 L/220, Sequential MPI.'
  },
  type6: {
    name: 'Jeep Wrangler - 2 door',
    image: './images/jeep-wrangler2.jpg',
    description: '3.6 Liters, V-6, 285 Hp, 6,400, Four-Wheel.'
  },
};

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('.modal .close-btn');
  const detailsBtns = document.querySelectorAll('.btn-card');

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
      const newCloseModalBtn = document.querySelector('.modal .close-btn');
      const newDetailsBtns = document.querySelectorAll('.btn-card');
      if (modal && newCloseModalBtn && newDetailsBtns.length) {
        observer.disconnect();
        setupEventListeners();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    setupEventListeners();
  }
});
