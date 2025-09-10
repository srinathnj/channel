import React,{Component,useState,useContext,useEffect} from "react";
import { useNavigate } from 'react-router';

export const withhRouter = (Component) =>{
    const Wrapper = (props) =>{
        const history = useNavigate();
        return <Component history={history} {...props}/>
    }
    return Wrapper;
};

let events = {}; // Object to store events

const Generate_Calendar = ({now}) =>  {
  var eventDateInput = document.getElementById('event-date');

  // const prevBtn = document.getElementById('prev');
  // const nextBtn = document.getElementById('next');
  const [nextBtn,setNextBtn] = useState();
  // const saveEventBtn = document.getElementById('save-event');
  const [prevBtn,setPrevBtn] = useState();
  const [saveEventBtn,setSaveEventBtn] = useState();
  const eventNameInput = document.getElementById('event-name');
  const [eventsModal,setEventModal] = useState();


  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(()=>{
      setEventModal(document.getElementById('event-modal'));
      setSaveEventBtn(document.getElementById('save-event'));
      setPrevBtn(document.getElementById('prev'));
      setNextBtn(document.getElementById('next'));
      generateCalendar(currentMonth, currentYear);
  },[]);


  const generateCalendar = (month, year) => {
      const monthYear = document.getElementById('month-year');
      const daysContainer = document.getElementById('days-container');
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

  const openEventModal = (day)=> {
     let eventModal = document.getElementById('event-modal');
      eventModal.style.display = 'flex';
      let eventDateInput = document.getElementById('event-date');
      eventDateInput.value = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  let closeModal = document.querySelector('.close');
  closeModal.addEventListener('click', () => {
    let eventModal = document.getElementById('event-modal');
      eventsModal.style.display = 'none';
  });
}

  if(saveEventBtn){
  saveEventBtn.addEventListener('click', () => {
      const eventName = eventNameInput.value;
      const eventDate = eventDateInput.value;

      if (eventName && eventDate) {
          const dateKey = eventDate;
          events[dateKey] = eventName;

          // Regenerate the calendar to display the new event
          generateCalendar(currentMonth, currentYear);
          eventsModal.style.display = 'none';
      }
  });
}

  if(prevBtn) prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
      }
      generateCalendar(currentMonth, currentYear);
  });

  if(nextBtn) nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
      }
      generateCalendar(currentMonth, currentYear);
  });

    return(
   <div>
   <div className="calendar-container">
       <div className="header">
           <button id="prev">&laquo; Prev</button>
           <h2 id="month-year"></h2>
           <button id="next">Next &raquo;</button>
       </div>
       <div className="days-of-week">
           <div>Sun</div>
           <div>Mon</div>
           <div>Tue</div>
           <div>Wed</div>
           <div>Thu</div>
           <div>Fri</div>
           <div>Sat</div>
       </div>
       <div id="days-container" className="days-container"></div>
   </div>

   {/*<!-- Modal for adding events -->*/}

   <div id="event-modal" className="modal">
       <div className="modal-content">
           <span className="close">&times;</span>
           <h2>Add Event</h2>
           <input type="text" id="event-name" placeholder="Event name"></input>
           <input type="date" id="event-date"></input>
           <button id="save-event">Save Event</button>
       </div>
   </div>
  </div>

    )


}

export default withhRouter(Generate_Calendar);
