const baseURL = "https://glaubervilane.github.io/wdd230/final-project/";
const dataURL = "https://glaubervilane.github.io/wdd230/final-project/data/rental-prices.json";

async function getPrices() {
  try {
    const response = await fetch(dataURL);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.rentals && Array.isArray(data.rentals)) {
      displayPrices(data.rentals);
    } else {
      throw new Error("Invalid data format: 'rentals' array not found.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayPrices(rentals) {
  // Display the rental prices in a table in the 'pricing-table-container' div
  let table = document.createElement('table');
  table.classList.add('pricing-table'); // Add the 'pricing-table' class

  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  // Create table header
  let headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Rental Type</th>
    <th>Max. Persons</th>
    <th>Half Day (Reservation)</th>
    <th>Full Day (Reservation)</th>
    <th>Half Day (Walk-In)</th>
    <th>Full Day (Walk-In)</th>
  `;
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  rentals.forEach((rental) => {
    let row = document.createElement('tr');
    row.innerHTML = `
      <td>${rental.type}</td>
      <td>${rental.persons}</td>
      <td>$${rental.halfDayReservation}</td>
      <td>$${rental.fullDayReservation}</td>
      <td>$${rental.halfDayWalkIn}</td>
      <td>$${rental.fullDayWalkIn}</td>
    `;
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Append the table to the 'pricing-table-container' div
  document.getElementById('pricing-table-container').appendChild(table);
}

getPrices();
