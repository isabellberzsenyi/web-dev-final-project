/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts/profile-context';

function ProfileNavBar({ currentPage }) {
  const { profile } = useProfile();
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;

  return (
    <nav className='nav nav-tabs d-flex'>
      <Link className={linkClassName('info')} to={`/profile/${profile._id}`}>
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
