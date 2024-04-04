import { Link } from 'react-router-dom';
import React from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.assign('/')
  };
  return (
    <header className="col-lg-12 bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
      {Auth.loggedIn() && (
        <Link className="text-dark" to="/homepage">
          <h1 className=" m-0" style={{ fontSize: '3rem' }}>
            Planorama
          </h1>
        </Link>
      )}
    {!Auth.loggedIn() && (          
      <h1 className=" m-0" style={{ fontSize: '3rem' }}>
      Welcome to Planorama!
    </h1>)}
        <nav className='text-center'>
          {Auth.loggedIn() && (
            <>
              <Link className="btn btn-lg btn-light m-2" to="/calendar">
                Calendar
              </Link>

              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          )}

          {!Auth.loggedIn() && (
            <>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
