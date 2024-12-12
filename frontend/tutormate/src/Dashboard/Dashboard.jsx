import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Courses from "../Courses/Courses.jsx";
import "./Dashboard.css";

function Dashboard() {
  const [courses, setCourses] = useState([]); // State to store courses

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

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <h1>Welcome to the Dashboard</h1>
          {courses.length > 0 ? (
            courses.map((course) => (
              <Courses
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
  );
}

export default Dashboard;
