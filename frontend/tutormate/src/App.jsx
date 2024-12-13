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
import PastWork from "./PastWork/PastWork.jsx";
import ViewPastQuiz from "./PastWork/ViewPastQuiz.jsx";
import ViewPastSummary from "./PastWork/ViewPastSummary.jsx";
import DisplayQuiz from "./PastWork/DisplayQuiz.jsx";
import DisplayFlashcard from "./PastWork/DisplayFlashcard.jsx";
import DisplayBulletpoint from "./PastWork/DisplayBulletpoint.jsx";
import DisplayFullsummary from "./PastWork/DisplayFullsummary.jsx";
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
        <Route path="/pastwork" element={<PastWork />} />
        <Route path="/viewpastquiz" element={<ViewPastQuiz />} />
        <Route path="/viewpastsummary" element={<ViewPastSummary />} />
        <Route path="/displayquiz" element={<DisplayQuiz />} />
        <Route path="/displayflashcard" element={<DisplayFlashcard />} />
        <Route path="/displaybulletpoint" element={<DisplayBulletpoint />} />
        <Route path="/displayfullsummary" element={<DisplayFullsummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
