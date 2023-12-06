// App.js
import React from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import HomeAdmin from './component/HomeAdmin'
import Users from './component/Users';
import EditUser from './component/Edituser';
import Register from './component/Register';
import Login from './component/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homeuser from './component/Homeuser';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<HomeAdmin/>}/>
        <Route path='/homeuser' element={<Homeuser />} />
        <Route path="/edit/:userId" element={<EditUser />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<Users />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
