const eventData = [
  { date: '2024-09-05', title: 'Event 1' },
  { date: '2024-09-15', title: 'Event 2' },
  { date: '2024-09-20', title: 'Event 3' },
];

// Function to populate the calendar with event data
function populateCalendar() {
  const calendarTable = document.querySelector('.calendar-table');
  const calendarCells = calendarTable.querySelectorAll('td.calendar-day');

  eventData.forEach(event => {
    const eventDate = new Date(event.date);
    const day = eventDate.getDate();
    const cell = calendarCells[day - 1];

    if (cell) {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event-item');
      eventElement.textContent = event.title;
      cell.appendChild(eventElement);
    }
  });
}

// Call the function to populate the calendar
populateCalendar();
