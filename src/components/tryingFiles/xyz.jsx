import React, { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';
import "react-big-calendar/lib/css/react-big-calendar.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';

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