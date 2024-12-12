import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Profile from "../Profile/Profile";
import Sidebar from "../Sidebar/Sidebar";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Loading...",
    id: "000000",
    email: "loading@aui.ma",
  });
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    fetch("/api/profile/")
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  useEffect(() => {
    fetch("/api/user-photo/")
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Failed to fetch profile picture");
        }
      })
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setProfilePic(imageUrl);
  
        // Clean up the object URL when the component unmounts
        return () => URL.revokeObjectURL(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching profile picture:", error);
        setProfilePic("placeholder.jpg"); // Fallback image on error
      });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <SearchBar />
        <div className="content">
          <Profile
            name={profile.name}
            id={profile.id}
            email={profile.email}
            semester="Fall 2024"
            ProfilePic={profilePic || "placeholder.jpg"}
            key={profilePic}
          ></Profile>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
