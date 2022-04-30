import React, {} from 'react';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';

function ProfileLikes() {
  return (
    <>
      <NavBar currentPage='' />
      <h1> Profile </h1>
      <ProfileNavBar currentPage='likes' />
    </>
  );
}

export default ProfileLikes;
