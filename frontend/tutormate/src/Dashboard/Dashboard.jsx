import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Courses from "../Courses/Courses.jsx";
import "./Dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]); // State to store courses
  const [sortBy, setSortBy] = useState("default"); // State for sorting option

  // Fetch courses when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/fetch-courses/");
        const data = await response.json();

        if (response.ok) {
          setCourses(data); // Store the courses data
        } else {
          console.error("Error fetching courses:", data.message);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    fetchCourses();
  }, []);

  // Function to sort courses based on selected option
  const getSortedCourses = () => {
    if (sortBy === "grade") {
      return [...courses].sort((a, b) => a.overall_grade - b.overall_grade);
    }
    return courses; // Default order
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        {/* Sort toggle */}
        <div className="sort-toggle">
          <label htmlFor="sort-options">Sort By:</label>
          <select
            id="sort-options"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="grade">Priority</option>
          </select>
        </div>

        <div className="content">
          <h1>Welcome to the Dashboard</h1>
          <div className="Courses-container">
            {courses.length > 0 ? (
              getSortedCourses().map((course) => (
                <Courses
                  key={course.id} // Unique key for mapped elements
                  CourseID={course.id}
                  CourseName={course.name}
                  CourseSemester={course.term_name}
                  CoursePic={course.image_url}
                  LetterGrade={course.letter_grade}
                  OverallGrade={course.overall_grade}
                />
              ))
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
