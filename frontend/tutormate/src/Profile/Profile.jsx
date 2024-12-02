
import React from 'react'
import "./Profile.css"
function Profile(props){
    return(
        <div className="Profile">
            <img className="Profile-Pic" src={props.ProfilePic} alt="" />
            <div className="Profile-Info">
                <h3 className="Profile-name">Name: {props.name}</h3>
                <h3 className="Profile-id">ID: {props.id}</h3>
                <h3 className="Profile-Contact">Email: {props.email}</h3>
                <h3 className="Profile-Semester">Semester: {props.semester}</h3>

            </div>
            
            

        </div>
    )

}
export default Profile
