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

// __________New__________________

import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarDash() {
    const [events, setEvents] = useState([]);
    const [employeeBirthdays, setEmployeeBirthdays] = useState([]);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);

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
            const updatedEvents = [...events, newEvent];
            setEvents(updatedEvents);
            localStorage.setItem('events', JSON.stringify(updatedEvents));
        }
    };

    const handleEventChanges = (event) => {
        const title = prompt('Edit Event name', event.title);
        const description = prompt('Edit Event Description', event.extendedProps.description);
        if (title) {
            const updatedEvents = events.map(evt =>
                evt.start.toISOString() === event.start.toISOString() && evt.end.toISOString() === event.end.toISOString() ? { ...evt, title, description } : evt
            );
            setEvents(updatedEvents);
            localStorage.setItem('events', JSON.stringify(updatedEvents));
        }
    };

    const combinedEvents = [...events, ...employeeBirthdays];

    return (
        <div className="container">
            <div className='Container'>
                <div className="mb-10">
                    <div className='w-full sm:w-[700px] md:w-[900px] lg:w-[1000px] mx-auto ml-10'>
                        <Calendar
                            localizer={localizer}
                            events={combinedEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            selectable
                            onSelectSlot={handleSelectDate}
                            onSelectEvent={handleEventChanges}
                            className='w-full'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

