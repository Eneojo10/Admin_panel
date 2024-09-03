import React from 'react';
import image from '../Images/himmarebrandlogo-removebg-preview.png';
import { RxDashboard } from 'react-icons/rx';
import { MdOutlineSchedule } from 'react-icons/md';
import { MdOutlineCategory } from 'react-icons/md';
import { SlPeople } from 'react-icons/sl';
import { GrCircleInformation } from 'react-icons/gr';
import { Link } from 'react-router-dom';

function Sidenav() {
  return (
    <div>
      <div className='side-bar'>
        <div className='himma-image'>
          <img src={image} alt='' />
        </div>
        <div className='border-line'></div>

        <div className='main'>
          <div className='board-flex'>
            <div className='dash-icon'>
              <RxDashboard />
            </div>
            <Link to={'/'} className='link-line'>
              <div className='d-board'>
                <h4>Dashboard</h4>
              </div>
            </Link>
          </div>
          <br />
          <div className='board-flex1'>
            <div className='dash-icon'>
              <MdOutlineCategory />
            </div>
            <Link to={'/category'} className='link-line'>
              <div className='d-board'>
                <h4>Category</h4>
              </div>
            </Link>
          </div>
          <br />
          <div className='board-flex3'>
            <div className='dash-icon'>
              <GrCircleInformation />
            </div>
            <Link to={'/information'} className='link-line'>
              <div className='d-board'>
                <h4>Informations</h4>
              </div>
            </Link>
          </div>
          <br />
          <div className='board-flex2'>
            <div className='dash-icon'>
              <MdOutlineSchedule />
            </div>
            <Link to={'/schedule'} className='link-line'>
              <div className='d-board'>
                <h4>Schedule</h4>
              </div>
            </Link>
          </div>
          <br />
          <div className='board-flex'>
            <div className='dash-icon'>
              <SlPeople />
            </div>
            <Link to={'/presenter'} className='link-line'>
              <div className='d-board'>
                <h4>Presenters</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidenav