import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Import all necessary components
import AppointmentScheduler from "./AppointmentScheduler";
import CallForm from "./CallForm";
import CallLogs from "./CallLogs";
import Dashboard from "./Dashboard";
import FindHospital from "./FindHospitalForm";
import MessageForm from "./MessageForm";
import PatientForm from "./PatientForm";
import SOSForm from "./SOSForm";
import Post from './post.jsx';
import Verify from './verify.js';

export const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch("http://localhost:5000/Form3");
        if (!response.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, []);

  const post = () => {
    return (
      <div>
        <div className="w-full h-auto border-4 rounded-md p-4 flex flex-col md:flex-row justify-center items-center gap-10 text-customGreen mb-5">
        
        <>
          {/* Left Column */}
          <div className="text-2xl flex flex-col gap-3">
            <h3>Date: 2025-06-13</h3>
            <h3>Timing: 13:30</h3>
            <h3>Mobile: 7822975573</h3>
          </div>

          {/* Right Column */}
          <div className="text-xl flex flex-col gap-3">
            <h3>Town: Mumbai</h3>
            <h3>District: Konkan</h3>
            <h3>State: Maharashtra</h3>
            
          </div>
        </>

   
    </div><div className="w-full h-auto border-4 rounded-md p-4 flex flex-col md:flex-row justify-center items-center gap-10 text-customGreen mb-5">
        
        <>
          {/* Left Column */}
          <div className="text-2xl flex flex-col gap-3">
            <h3>Date: 2025-03-20</h3>
            <h3>Timing: 15:00</h3>
            <h3>Mobile: 9876451242</h3>
          </div>

          {/* Right Column */}
          <div className="text-xl flex flex-col gap-3">
            <h3>Town: Karad</h3>
            <h3>District: Satara</h3>
            <h3>State: Maharashtra</h3>
            
          </div>
        </>

   
    </div><div className="w-full h-auto border-4 rounded-md p-4 flex flex-col md:flex-row justify-center items-center gap-10 text-customGreen mb-5">
        
        <>
          {/* Left Column */}
          <div className="text-2xl flex flex-col gap-3">
            <h3>Date: 2025-08-19</h3>
            <h3>Timing: 19:15</h3>
            <h3>Mobile: 9021456732</h3>
          </div>

          {/* Right Column */}
          <div className="text-xl flex flex-col gap-3">
            <h3>Town: Vishakhapatnam</h3>
            <h3>District: Koligowda</h3>
            <h3>State: Karnataka</h3>
            
          </div>
        </>

   
    </div>



      </div>
      
    );
  };

  return (
    <div className="w-full h-screen font-pop flex gap-4">
      {/* Sidebar */}
      <div className="w-60 h-full flex bg-customGreen mt-14 flex-col text-white p-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/verify")}>
            Verify
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/post")}>
            Post
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/Appointment")}>
            Appointment
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/callform")}>
            Call form
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/calllogs")}>
            Call log
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/dashboard")}>
            Dashboard
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/findhospital")}>
            Find Hospital
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/messageform")}>
            Message form
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/patientform")}>
            Patient form
          </h4>
          <h4 className="text-xl font-pop hover:bg-customRed p-2 text-center cursor-pointer" onClick={() => navigate("/home/sosform")}>
            SOS
          </h4>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow h-full mt-16 p-3 overflow-y-scroll">
        {location.pathname === "/home" && post()}
        {location.pathname === "/home/post" && <Post/>}
        {location.pathname === "/home/verify" && <Verify/>}
        {location.pathname === "/home/Appointment" && <AppointmentScheduler />}
        {location.pathname === "/home/callform" && <CallForm />}
        {location.pathname === "/home/calllogs" && <CallLogs />}
        {location.pathname === "/home/dashboard" && <Dashboard />}
        {location.pathname === "/home/findhospital" && <FindHospital />}
        {location.pathname === "/home/messageform" && <MessageForm />}
        {location.pathname === "/home/patientform" && <PatientForm />}
        {location.pathname === "/home/sosform" && <SOSForm />}
      </div>
    </div>
  );
};
