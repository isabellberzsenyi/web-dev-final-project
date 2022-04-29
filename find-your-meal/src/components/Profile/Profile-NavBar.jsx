import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts/profile-context';

function ProfileNavBar({ currentPage }) {
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;
  const [signedIn, setSignedIn] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    setSignedIn(!!profile);
  }, [profile]);

  return (
    <nav className='nav nav-tabs d-flex'>
      {!(signedIn && profile) ? (
        <>
          <Link className={linkClassName('info')} to='/profile'>
            Profile
          </Link>
          <Link className={linkClassName('likes')} to='/profile/likes'>
            Likes
          </Link>
          <Link className={`${linkClassName('comments')} me-auto`} to='/profile/comments'>
            Comments
          </Link>
        </>
      ) : (
        <>
          <Link className={linkClassName('likes')} to='/profile/likes'>
            Likes
          </Link>
          <Link className={`${linkClassName('comments')} me-auto`} to='/profile/comments'>
            Comments
          </Link>
        </>
      )}
    </nav>
  );
}

export default ProfileNavBar;
