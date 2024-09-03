import React, { useState, useEffect } from 'react';
import Sidenav from '../Navigations/Sidenav';
import Navbar from '../Navigations/Navbar';
import axios from 'axios';
import { BASE_URL } from '../../../utils/globals';

function Schedule() {
  const [schedule, setSchedule] = useState({
    title: '',
    status: false,
    duration: '',
    start_time: '',
    end_time: '',
    date: '',
  });

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; 
    const formattedStartTime = now.toTimeString().split(' ')[0]; 

    setSchedule(prevSchedule => ({
      ...prevSchedule,
      start_time: formattedStartTime,
      end_time: formattedStartTime,
      date: formattedDate,
    }));
  }, []);

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = async () => {
    try {
      setSchedule(prevSchedule => ({ ...prevSchedule, status: !prevSchedule.status }));
      
      await axios.put(`${BASE_URL}/schedules/${schedule._id}/change-status`, {
        status: !schedule.status,
      });

    } catch (error) {
      console.error('Error updating schedule status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/schedules`, schedule);

      setSchedule(prevSchedule => ({ ...prevSchedule, _id: response.data._id }));

      alert('Schedule added successfully');

      setSchedule({
        title: '',
        status: false,
        duration: '',
        start_time: '',
        end_time: '',
        date: '',
      });
    } catch (error) {
      console.error('Error adding new schedule:', error);
      alert('Failed to add schedule. Please try again');
    }
  };

  return (
    <div>
      <div className='dash_board'>
        <div className='dash-sidenav'>
          <Sidenav />
        </div>

        <div className='dash-navbar'>
          <Navbar />
          <div className='presenter-section'>
            <form onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type='text'
                  name='title'
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
                  type='text'
                  name='duration'
                  value={schedule.duration}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Start Time:
                <input
                  type='text'
                  name='start_time'
                  value={schedule.start_time}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                End Time:
                <input
                  type='text'
                  name='end_time'
                  value={schedule.end_time}
                  onChange={handleChange}
                />
              </label>
              <br />
              <br />
              <label>
                Date:
                <input
                  type='text'
                  name='date'
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
                    type='checkbox'
                    name='status'
                    checked={schedule.status}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <br />
              </div>
              <button className='schedule-btn' type='submit'>
                Add Schedule
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
