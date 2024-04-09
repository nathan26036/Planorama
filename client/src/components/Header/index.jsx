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
          <h1><a className="ml-5 display-3 text-light " href="/homepage">Planorama</a></h1>
        </div>

      )}
    {!Auth.loggedIn() && (          
      <h1 className="text-light m-0" style={{ fontSize: '3rem' }}>
      Welcome to Planorama!
    </h1>)}
    <div className="mr-5 mt-2" >
          {Auth.loggedIn() && (
    
    <ul className="list-inline me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <h4><a className="list-inline-item text-light" href="/calendar">Calendar</a></h4>
      </li>
      <li className="nav-item">
        <h4><a className="list-inline-item text-light" onClick={logout}>Logout</a></h4>
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
