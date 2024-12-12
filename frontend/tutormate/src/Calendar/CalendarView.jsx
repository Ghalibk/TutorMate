import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";  // Default styles
import "./CalendarView.css";  // Custom styles
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar";

// Use moment for date localization
const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // To store the selected event data
  const [showPopup, setShowPopup] = useState(false); // To control the popup visibility

  // Fetch To-Do tasks from the API when the component mounts
  useEffect(() => {
    const fetchToDoTasks = async () => {
      try {
        const response = await fetch("/api/todo/");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to fetch tasks. Server responded with:", errorText);
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        const formattedTasks = data.map((task) => ({
          title: task.assignment_name,
          start: new Date(task.due_date),
          end: new Date(task.due_date),
          allDay: true,
          assignment_url: task.assignment_url, // Add the URL to the event data
          description: task.description, // Assuming there's a description field
        }));

        setEvents(formattedTasks); // Set the formatted tasks into the calendar's events
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchToDoTasks();
  }, []);

  // Handle event selection (click)
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Store the selected event data
    setShowPopup(true); // Show the popup with more information
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <div style={{ height: "100vh", padding: "20px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{
                height: 600,
                backgroundColor: "transparent",
              }}
              defaultView="month"
              onSelectEvent={handleEventClick} // When an event is clicked
            />
          </div>
        </div>
      </div>

      {/* Popup modal to show the selected event details */}
      {showPopup && selectedEvent && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedEvent.title}</h2>
            <p><strong>Due Date:</strong> {selectedEvent.start.toString()}</p>
            <p>
              <strong>Description:</strong>
              <span
                dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
              ></span>
            </p>
            <p><strong>Go to assignment:</strong> <a href={selectedEvent.assignment_url} target="_blank" rel="noopener noreferrer">View Assignment</a></p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
