import { Link } from 'react-router-dom';
import React from 'react';
import Auth from '../../utils/auth';
import './nav.css';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign('/')
  };
  return (
    
    <nav className="navbar bg-dark border-bottom border-body mb-5" data-bs-theme="dark">
      <div className="container-fluid">
      {Auth.loggedIn() && (
        <div className="">
          <h1><a className=" text-light " href="/homepage">Planorama</a></h1>
        </div>

      )}
    {!Auth.loggedIn() && (          
      <h1 className=" m-0" style={{ fontSize: '3rem' }}>
      Welcome to Planorama!
    </h1>)}
    <div className="justify-content-end" id="navbarNav">
          {Auth.loggedIn() && (
    
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link text-light" href="/calendar">Calendar</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-light" onClick={logout}>Logout</a>
      </li>
    </ul>
 
          )}

          {!Auth.loggedIn() && (
            <>
            </>
          )}
          
        </div>
      </div >
    </nav>
  );
};

export default Header;
