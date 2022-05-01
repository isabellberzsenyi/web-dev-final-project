/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/profile-context';

function NavBar({ currentPage }) {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(false);
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;
  const { profile, signout } = useProfile();

  useEffect(() => {
    setSignedIn(!!profile);
  }, [profile]);

  const onClickSignOut = async () => {
    await signout();
    navigate('/');
  };

  return (
    <nav className='nav nav-tabs d-flex'>
      <Link className={linkClassName('home')} to='/'>
        Home
      </Link>
      <Link className={`${linkClassName('search')} me-auto`} to='/search'>
        Search
      </Link>
      {!(signedIn && profile) ? (
        <>
          <Link className={linkClassName('login')} to='/login'>
            Login
          </Link>
          <Link className={linkClassName('signup')} to='/register'>
            Sign Up
          </Link>
        </>
      ) : (
        <div className='d-flex align-items-center'>
          <Link className='my-0 mx-2' to={`/profile/${profile._id}`}>
            Hey {profile.firstName}
          </Link>
          <button className='btn btn-primary' type='button' onClick={onClickSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
