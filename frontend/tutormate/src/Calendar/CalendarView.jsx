import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";  // Default styles
import "./CalendarView.css";  // Custom styles
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../SearchBar/SearchBar";

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([
    {
      title: "Meeting with Team",
      start: new Date(2024, 10, 28, 10, 0),  // Note: Month is 0-indexed
      end: new Date(2024, 10, 28, 11, 0),
      allDay: false,
    },
    {
      title: "Lunch Break",
      start: new Date(2024, 10, 28, 13, 0),
      end: new Date(2024, 10, 28, 14, 0),
      allDay: false,
    },
  ]);

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
              defaultView="month"  // You can change the default view to "week" or "day"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
