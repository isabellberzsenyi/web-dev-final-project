/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ProfileNavBar({ currentPage }) {
  const linkClassName = (page) => `nav-link p-2 ${currentPage === page ? 'active' : ''}`;
  const { userId } = useParams();

  return (
    <nav className='nav nav-tabs d-flex'>
      <Link className={linkClassName('info')} to={`/profile/${userId}`}>
        Profile
      </Link>
      <Link className={linkClassName('likes')} to={`/profile/likes/${userId}`}>
        Likes
      </Link>
      <Link className={`${linkClassName('comments')} me-auto`} to={`/profile/comments/${userId}`}>
        Comments
      </Link>
    </nav>
  );
}

export default ProfileNavBar;
