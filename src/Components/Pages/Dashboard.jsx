import React from 'react';
import Sidenav from '../Navigations/Sidenav';
import Navbar from '../Navigations/Navbar';
import image from '../Images/himmarebrandlogo-removebg-preview.png';

function Dashboard() {
  return (
    <div>
      <div className='dash_board'>
        <div className='dash-sidenav'>
          <Sidenav />
        </div>

        <div className='dash-navbar'>
          <Navbar/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard