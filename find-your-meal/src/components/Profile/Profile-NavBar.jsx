import React from 'react';
import { Link } from 'react-router-dom';

function ProfileNavBar({ currentPage }) {
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;
  return (
    <nav className='nav nav-tabs d-flex'>
      <Link className={linkClassName('info')} to='/profile'>
        Profile
      </Link>
      <Link className={linkClassName('likes')} to='/profile/likes'>
        Likes
      </Link>
      <Link className={`${linkClassName('comments')} me-auto`} to='/profile/comments'>
        Comments
      </Link>
    </nav>
  );
}

export default ProfileNavBar;
