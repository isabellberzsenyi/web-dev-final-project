import React, {} from 'react';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';

function ProfileComments() {
  return (
    <>
      <NavBar currentPage='' />
      <h1> Profile </h1>
      <ProfileNavBar currentPage='comments' />

    </>
  );
}

export default ProfileComments;
