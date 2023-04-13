import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';

// const url = "http://localhost:4500/api/auth/register";
const url = "https://login-485k.onrender.com/api/auth/register";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('umesh');
  const [email, setEmail] = useState('umesh@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [phone, setPhone] = useState('939848382');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'phone') {
      setPhone(value);
    }
  };

  const handleSubmit = () => {
   axios.post(url, { name, email, password, phone })
      .then(() => navigate('/login'))
      .catch(error => console.error('Error registering user:', error))
  };

  return (
    <>
      <Nav />
      
      <div className="container mt-5 mb-5">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Register</h3>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-6 form-group">
                <label htmlFor="fname" className='control-label'>Full Name</label>
                <input className="form-control" id="fname" name="name"
                  value={name} onChange={handleChange} />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="email" className='control-label'>Email</label>
                <input className="form-control" id="email" name="email"
                  value={email} onChange={handleChange} />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="password" className='control-label'>Password</label>
                <input className="form-control" id="password" name="password"
                  value={password} onChange={handleChange} />
              </div>
              <div className="col-md-6 form-group">
                <label htmlFor="phone" className='control-label'>Phone</label>
                <input className="form-control" id="phone" name="phone"
                  value={phone} onChange={handleChange} />
              </div>
            </div>
            <button className="btn btn-success mt-3" onClick={handleSubmit}>
              Register
            </button>
            <Link to={'/login'}>Already registered? Login Here</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;
