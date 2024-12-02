import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage/SignUpPage";
import EnterToken from "./TokenPage/EnterToken";
import SignUpLogin from "./SignUpLoginPage/SignUpLogin";

import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile/Profile";
import ProfilePage from "./ProfilePage/ProfilePage";
import ServicesPage from "./Services/ServicesPage";
import SummaryOpt from "./Summary/SummaryOpt";
import BulletPoint from "./Summary/BulletPoint";
import FullSummary from "./Summary/FullSummary";
import ModuleChoice from "./Summary/ModuleChoice";
import ToDo from "./ToDo/ToDo";
import FlashcardsPage from "./FlashcardsPage/FlashcardsPage";
import CalendarView from "./Calendar/CalendarView";
import Quizzes from "./Quizzes/Quizzes.jsx";
import OutlookButton from "./OutlookButton/OutlookButton.jsx"
import LoginFormPage from "./LoginFormPage/LoginFormPage.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page with "Login with Outlook" button */}
        <Route path="/" element={<LoginFormPage />} />
         {/* Login form page with email/password inputs */}
     
         <Route path="/token" element={<EnterToken />} /> 

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/servicespage" element={<ServicesPage />} />
        <Route path="/summaryopt" element={<SummaryOpt />} />
        <Route path="/bulletpoint" element={<BulletPoint />} />
        <Route path="/fullsummary" element={<FullSummary />} />
        <Route path="/modulechoice" element={<ModuleChoice />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/flashcardspage" element={<FlashcardsPage />} />
        <Route path="/calendarview" element={<CalendarView />} />
        <Route path="/quizzes" element={<Quizzes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
