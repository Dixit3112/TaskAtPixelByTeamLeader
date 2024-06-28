import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';
import "react-big-calendar/lib/css/react-big-calendar.css";



const localizer = globalizeLocalizer(globalize);

export default function CalendarComponent() {
    const [userEvents, setUserEvents] = useState([]);
    const [employeeBirthdays, setEmployeeBirthdays] = useState([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setUserEvents(storedEvents);

        const empData = JSON.parse(localStorage.getItem("employeeData")) || [];
        const currentYear = new Date().getFullYear();
        const empBirthdays = empData.map(emp => {
            const birthDate = new Date(emp.birthDate);
            const start = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
            return {
                title: `${emp.firstName} ${emp.lastName} - Birthday`,
                start,
                end: start,
                allDay: true // To make it an all-day event
            };
        });
        setEmployeeBirthdays(empBirthdays);
    }, []);

    const handleSelectDate = ({ start, end }) => {
        const title = prompt('New Event Name');
        const description = prompt('Event Description');
        if (title) {
            const newEvent = { title, start, end, description };
            const updatedEvents = [...userEvents, newEvent];
            setUserEvents(updatedEvents);
            localStorage.setItem('events', JSON.stringify(updatedEvents));
        }
    };

    const handleEventChanges = (event) => {
        const title = prompt('Edit Event name', event.title);
        const description = prompt('Edit Event Description', event.extendedProps.description);
        if (title) {
            const updatedEvents = userEvents.map(evt =>
                evt.start.toISOString() === event.start.toISOString() && evt.end.toISOString() === event.end.toISOString()
                    ? { ...evt, title, description }
                    : evt
            );
            setUserEvents(updatedEvents);
            localStorage.setItem('events', JSON.stringify(updatedEvents));
        }
    };

    const combinedEvents = [...userEvents, ...employeeBirthdays];

    return (
        <div className='Container'>
            <div className="flex gap-10 items-center flex-wrap px-32 my-20">
                <div className="w-full">
                    <Calendar
                        localizer={localizer}
                        events={combinedEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        selectable
                        onSelectSlot={handleSelectDate}
                        onSelectEvent={handleEventChanges}
                    />
                </div>
            </div>
        </div>
    );
}



// 1-> Convert the selected date to a format that react - big - calendar and FullCalendar can understand.
// 2-> Ensure the start and end properties of the event are correctly set.
// 3-> Update the handleSelect and handleEventClick functions to include the correct date format.

// Explanation:
// Events Initialization:
// Use useEffect to load the initial events, including employee birthdays.

// handleSelect Function:
// This function is triggered when a user selects a date on the calendar.
// It prompts the user to enter the event's title and description.
// It sets the start and end dates for the new event.
// It updates the events state and stores the updated events in localStorage.

// handleEventClick Function:
// This function is triggered when a user clicks on an existing event.
// It prompts the user to edit the event's title and description.
// It updates the events state and stores the updated events in localStorage.

// Rendering the Calendar:
// Two calendar components are used: react - big - calendar and FullCalendar.
// Both calendars display the events from the events state.
// The react - big - calendar is configured to be selectable, triggering handleSelect on slot selection and handleEventClick on event selection.

// The FullCalendar is configured similarly, using dateClick for date selection and eventClick for event selection.


// _________________________________Two type of Calender_________________________

// import React, { useEffect, useState } from 'react';
// import { Calendar, globalizeLocalizer } from 'react-big-calendar';
// import globalize from 'globalize';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from '@fullcalendar/interaction'


// const localizer = globalizeLocalizer(globalize)
// export default function Calender() {

//     const [events, setEvents] = useState([]);
//     const myEventsList = JSON.parse(localStorage.getItem('events')) || [];

//     useEffect(() => {
//         const empData = JSON.parse(localStorage.getItem("employeeData")) || []
//         const empBirthdays = empData.map(emp => ({
//             title: `${emp.firstName} ${emp.lastName} - Birthday`,
//             start: new Date(emp.birthDate),
//             end: new Date(emp.birthDate),
//         }));
//         setEvents([...myEventsList, ...empBirthdays])
//     }, []);

//     const handleSelectDate = ({ start, end }) => {
//         const title = prompt('New Event Name');
//         const description = prompt('Event Description');
//         if (title) {
//             const newEvent = { title, start, end, description };
//             const updateEvents = [...events, newEvent];
//             setEvents(updateEvents);
//             localStorage.setItem('events', JSON.stringify(updateEvents));
//         }
//     };
//     const handleEventChanges = (event) => {
//         const title = prompt('Edit Event name', event.title);
//         const description = prompt('Edit Event Description', event.extendedProps.description);
//         if (title) {
//             const updateEvents = events.map(evt =>
//                 evt.start.toISOString() === event.start.toISOString() && evt.end.toISOString() === event.end.toISOString()
//                     ? { ...evt, title, description }
//                     : evt
//             );
//             setEvents(updateEvents);
//             localStorage.setItem('events', JSON.stringify(updateEvents));
//         }
//     };
//     return (
//         <div className='Container'>
//             <div className="flex gap-10 items-center flex-wrap px-32 my-20">
//                 <div className="w-full">
//                     <Calendar
//                         localizer={localizer}
//                         events={events}
//                         startAccessor="start"
//                         endAccessor="end"
//                         style={{ height: 500 }}
//                         selectable
//                         onSelectSlot={handleSelectDate}
//                         onSelectEvent={handleEventChanges}
//                     />
//                 </div>
//                 <div className="w-full">
//                     <FullCalendar
//                         plugins={[dayGridPlugin, interactionPlugin]}
//                         initialView="dayGridMonth"
//                         weekends={true}
//                         events={events}
//                         dateClick={handleSelectDate}
//                         eventClick={handleEventChanges}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// __________________Header____________________________

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../styleFiles/header.scss";

// export default function Header() {
//     const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [logPunchIn, setLogPunchIn] = useState({
//         dropdownOpen: false,
//         punchInTime: null,
//         punchOutTime: null,
//         totalWorkTime: null,
//     });

//     useEffect(() => {
//         const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//         if (loggedInUser) {
//             setUser(loggedInUser);
//             console.log("loginUser", setUser(loggedInUser))
//             // localStorage.setItem('user', true);
//         }

//         // Retrieve punch times from localStorage
//         const storedPunchInTime = localStorage.getItem("punchInTime");
//         const storedPunchOutTime = localStorage.getItem("punchOutTime");

//         const newLogPunchIn = { ...logPunchIn };

//         if (storedPunchInTime) {
//             newLogPunchIn.punchInTime = new Date(storedPunchInTime);
//         }
//         if (storedPunchOutTime) {
//             newLogPunchIn.punchOutTime = new Date(storedPunchOutTime);
//         }

//         // Calculate total working time
//         if (newLogPunchIn.punchInTime && newLogPunchIn.punchOutTime) {
//             const totalWorkMillis = newLogPunchIn.punchOutTime - newLogPunchIn.punchInTime;
//             newLogPunchIn.totalWorkTime = totalWorkMillis / 1000 / 60; // Convert to minutes
//         }

//         setLogPunchIn(newLogPunchIn);
//     }, []);

//     const handleLogout = () => {
//         localStorage.removeItem('loggedInUser');
//         setUser(null);
//         navigate('/login');
//     };

//     const formatTime = (date) => {
//         if (!date) return 'N/A';
//         return date.toLocaleTimeString();
//     };

//     const toggleDropdown = () => {
//         setLogPunchIn(prevState => ({
//             ...prevState,
//             dropdownOpen: !prevState.dropdownOpen,
//         }));
//     };

//     return (
//         <div className='Header flex items-center justify-center h-20 bg-gray-800'>
//             <div className="container mx-auto px-4">
//                 <div className="menu pl-40 flex justify-between items-center ">
//                     <a href='/management' className='infoHead pl-14 text-white'>Business Management</a>
//                     <a href='/' className='Logo text-white'>LOGO</a>
//                     {user ? (
//                         <div className='relative'>
//                             <button
//                                 className='text-white focus:outline-none'
//                                 onClick={toggleDropdown}
//                             >
//                                 {user.firstName}
//                             </button>
//                             {logPunchIn.dropdownOpen && (
//                                 <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50'>
//                                     <button
//                                         onClick={navigate('/employee/profile')}
//                                         className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'
//                                     >
//                                         Veiw Profile
//                                     </button>
//                                     <button
//                                         onClick={handleLogout}
//                                         className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'
//                                     >
//                                         Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <a href='/login' className='signIn text-white'>Sign In</a>
//                     )}
//                     {user && (
//                         <div className="flex flex-col items-end text-white">
//                             <span>Punch In Time: {formatTime(logPunchIn.punchInTime)}</span>
//                             <span>Punch Out Time: {formatTime(logPunchIn.punchOutTime)}</span>
//                             <span>Total Work Time: {logPunchIn.totalWorkTime ? `${logPunchIn.totalWorkTime.toFixed(2)} minutes` : 'N/A'}</span>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

