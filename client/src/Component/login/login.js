import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav';

// const url = "http://localhost:4500/api/auth/login"
const url = "https://login-485k.onrender.com/api/auth/login"

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('umesh@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSubmit = () => {
    axios.post(url, { email, password }, {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        const data = response.data;
        if (data.auth === false) {
          setMessage(data.token);
        } else {
          sessionStorage.setItem('ltk', data.token);
          sessionStorage.setItem('loginStatus', 'loggedIn');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <Nav />
      
      <div className="container mt-5 mb-5">
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3>Login</h3>
            <h2>{message}</h2>
          </div>
          <div className="panel-body">
            <div className="row">
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
            </div>
            <button className="btn btn-success mt-3" onClick={handleSubmit}>
              Login
            </button>
            <Link to={'/register'}>Not registered yet? Click Here</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
