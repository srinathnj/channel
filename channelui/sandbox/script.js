const daysContainer = document.getElementById('days-container');
const monthYear = document.getElementById('month-year');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const eventModal = document.getElementById('event-modal');
const closeModal = document.querySelector('.close');
const saveEventBtn = document.getElementById('save-event');
const eventNameInput = document.getElementById('event-name');
const eventDateInput = document.getElementById('event-date');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = {}; // Object to store events

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function generateCalendar(month, year) {
    daysContainer.innerHTML = '';
    monthYear.innerText = `${months[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty divs for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement('div');
        daysContainer.appendChild(emptyDiv);
    }

    // Add day divs with click functionality to open the modal
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = day;

        // If there's an event for this day, display it
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (events[dateKey]) {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerText = events[dateKey];
            dayDiv.appendChild(eventDiv);
        }

        dayDiv.addEventListener('click', () => openEventModal(day));
        daysContainer.appendChild(dayDiv);
    }
}

function openEventModal(day) {
    eventModal.style.display = 'flex';
    eventDateInput.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

closeModal.addEventListener('click', () => {
    eventModal.style.display = 'none';
});

saveEventBtn.addEventListener('click', () => {
    const eventName = eventNameInput.value;
    const eventDate = eventDateInput.value;

    if (eventName && eventDate) {
        const dateKey = eventDate;
        events[dateKey] = eventName;

        // Regenerate the calendar to display the new event
        generateCalendar(currentMonth, currentYear);
        eventModal.style.display = 'none';
    }
});

prevBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
});

// Initial calendar generation
generateCalendar(currentMonth, currentYear);
