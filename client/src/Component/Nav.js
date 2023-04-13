import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

const url = "https://login-485k.onrender.com/api/auth/userinfo";
// const search = "http://localhost:7700/allProducts?search=";
const search ="https://winkart.onrender.com/allProducts?search="

const Nav = () => {
  const [userData, setUserData] = useState('');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [serPro, setSerPro] = useState();

  const handleLogout = () => {
    sessionStorage.removeItem('ltk');
    sessionStorage.removeItem('userInfo')
    sessionStorage.setItem('loginStatus', 'loggedOut');
    setUserData('');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const searchUrl = `${search}${searchQuery}`;
      axios.get(searchUrl)
        .then((response) => {
          setSerPro(response.data);
          navigate('/search', { state: { searchResults: response.data } });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  

  const conditionalHeader = () => {
    if (userData.name) {
      let data = userData;
      sessionStorage.setItem('userInfo', JSON.stringify(data));
      return (
        <>
          <li className="nav-item">
            <h4 className="nav-link" style={{ color: "white", textAlign: "center" }}>Hi {data.name}</h4>
          </li>
          <li className="nav-item">
            <Link to={'/orders'} className="nav-link"><i className='fa fa-shopping-cart'></i></Link>
          </li>
          <li className="nav-item">
            <Link to={'/'} onClick={handleLogout} className="nav-link" href="#"><i className='fa fa-sign-out'></i></Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link to={'/login'} className="nav-link" aria-current="page" href="#"><i className='fa fa-user-circle'></i></Link>
          </li>
          <li className="nav-item">
            <Link to={'/login'} onClick={() => alert("please login first")} className="nav-link" href="#"><i className='fa fa-shopping-cart'></i></Link>
          </li>
        </>
      );
    }
  };

  useEffect(() => {
    axios.get(url, {
      headers: {
        "x-access-token": sessionStorage.getItem("ltk"),
      },
    })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (

    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link style={{ lineHeight: "20px" }} to={'/'} className="navbar-brand" href="#">WinKart <br /><span style={{ fontSize: "12px" }}>deliver in winktime</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {conditionalHeader()}

          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch} className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>




  );
}

export default Nav;
