import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../contexts/profile-context';

function NavBar({ currentPage }) {
  const [signedIn, setSignedIn] = useState(false);
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;
  const { profile, signout } = useProfile();

  useEffect(() => {
    setSignedIn(!!profile);
  }, [profile]);

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
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Hey {profile.firstName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className={linkClassName('profile')} to='/profile'>
                Profile
              </Link>
              <Link className={linkClassName('likes')} to='/profile/likes'>
                Your Likes
              </Link>
              <Link className={linkClassName('comments')} to='/profile/comments'>
                Your Comments
              </Link>
            </div>
          </div>
          <button className="btn btn-primary" type='button' onClick={() => signout()}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
