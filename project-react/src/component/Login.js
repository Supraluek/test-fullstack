import React, { useState } from 'react';
import '../style/Login.css'
import iconuser from '../Images/user.png'
import iconpass from '../Images/key.png'
import logo from '../Images/logo1.png'
import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:1010/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.status === 'ok') {
        console.log('Login success!');
        localStorage.setItem("token", data.token);
        const token = data.token;
        const decoded = jwtDecode(token);
        const userRole = decoded.role;

        if (userRole === 'admin') {
          console.log('User is an admin');
          window.location = '/home'; 
        } else {
          console.log('User is a regular user');
          window.location = '/homeuser'; 
        }
      } else {
        console.log('Login error:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  

  return (
    <div className='Background'>
      <div className='Container-login'>
        <div className='header'>
          <div className='text'>
            <img className='logologin' src={logo} alt="Logo" />
          </div>
        </div>
        <div className='headerinput'>
          <div className='textinput'>
            <img className='iconusers' src={iconuser} alt="User Icon" />
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='textinput'>
            <img className='iconusers' src={iconpass} alt="Password Icon" />
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='textinput button'>
            <button type="button" className="btn btn-outline-secondary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
