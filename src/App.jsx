import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidenav from './Components/Navigations/Sidenav';
import Navbar from './Components/Navigations/Navbar';
import Dashboard from './Components/Pages/Dashboard';
import Category from './Components/Pages/Category';
import Informations from './Components/Pages/Informations';
import Schedule from './Components/Pages/Schedule';
import Presenters from './Components/Pages/Presenters';




function App() {
  return (
    <Routes>
      <Route path='/sidenav' element={<Sidenav />} />
      <Route path='/nav' element={<Navbar />} />
      <Route path='/' element={<Dashboard />}/>
      <Route path='/category' element={<Category />} />
      <Route path='/information' element={<Informations />} />
      <Route path='/schedule' element={<Schedule />}/>
      <Route path='/presenter' element={<Presenters />} />
    </Routes>
  )
}

export default App;