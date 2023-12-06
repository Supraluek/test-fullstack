import React, { useState } from 'react';
import '../style/Register.css';
import iconuser from '../Images/user.png';
import iconpass from '../Images/key.png';
import logo from '../Images/logo1.png';
import iconmail from '../Images/mail.png'

function Register() { 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user')
  

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:1010/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password,role }),
      });

      const data = await response.json();

      if (data.status === 'ok') {
        console.log('Registration success!');
        window.location ='/login'
      
      } else {
        console.log('Registration error:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className='Background'>
      <div className='Container-register'> 
        <div className='header'>
          <div className='text'>
            <img className='logoregister' src={logo} alt="Logo" /> 
          </div>
        </div>
        <div className='headerinput'>
        <div className='textinput'>
            <img className='iconusers' src={iconuser} alt="User Icon" />
            <input
              type="username"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='textinput'>
            <img className='iconusers' src={iconmail} alt="User Icon" />
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
            <button type="button" className="btn btn-outline-secondary" onClick={handleRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
