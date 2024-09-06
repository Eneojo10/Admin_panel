import React, { useState, useEffect } from "react";
import Sidenav from "../Navigations/Sidenav";
import Navbar from "../Navigations/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../../utils/globals";

function Schedule() {
  const [schedule, setSchedule] = useState({
    title: "",
    status: false,
    duration: "",
    start_time: "",
    end_time: "",
    date: "",
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedStartTime = now.toTimeString().split(" ")[0];

    const savedScheduleId = localStorage.getItem("scheduleId");

    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      start_time: formattedStartTime,
      end_time: formattedStartTime,
      date: formattedDate,
      _id: savedScheduleId || "",
    }));
  }, []);

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, duration, start_time, end_time, date } = schedule;

      
      const newSchedule = { title, duration, start_time, end_time, date };

      const response = await axios.post(`${BASE_URL}/schedules`, newSchedule); 
      console.log(response);

      
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        _id: response.data.schedule._id, 
      }));

      localStorage.setItem("scheduleId", response.data.schedule._id);

      toast.success("Schedule added successfully!");
    } catch (error) {
      console.error("Error adding new schedule:", error);
      toast.error("Failed to add schedule. Please try again.");
    }
  };

  const handleCheckboxChange = async () => {
    const savedScheduleId = schedule._id || localStorage.getItem("scheduleId");
  
    if (!savedScheduleId) {
      toast.error("Schedule ID is undefined. Please create the schedule first.");
      return;
    }
  
    try {
      
      const newStatus = !schedule.status;
  
      
      setSchedule((prevSchedule) => ({
        ...prevSchedule,
        status: newStatus,
      }));
  
      
      await axios.put(`${BASE_URL}/schedules/${savedScheduleId}/change-status`, {
        status: newStatus,  
      });
  
      
      toast.success("Schedule status updated successfully!");
    } catch (error) {
      console.error("Error updating schedule status:", error);
  
      
      toast.error("Failed to update schedule status.");
    }
  };
  

  return (
    <div>
      <div className="dash_board">
        <div className="dash-sidenav">
          <Sidenav />
        </div>

        <div className="dash-navbar">
          <Navbar />
          <div className="presenter-section">
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={schedule.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <br />
              <label>
                Duration:
                <input
                  type="text"
                  name="duration"
                  value={schedule.duration}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Start Time:
                <input
                  type="text"
                  name="start_time"
                  value={schedule.start_time}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                End Time:
                <input
                  type="text"
                  name="end_time"
                  value={schedule.end_time}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Date:
                <input
                  type="text"
                  name="date"
                  value={schedule.date}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <div>
                <label>
                  Status:
                  <input
                    type="checkbox"
                    name="status"
                    checked={schedule.status}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <br />
              </div>
              <button className="schedule-btn" type="submit">
                Add Schedule
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Schedule;
