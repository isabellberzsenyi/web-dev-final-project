import React from 'react';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';

function ProfileInfo() {
  return (
    <>
      <NavBar currentPage='' />
      <h1> Profile </h1>
      <ProfileNavBar currentPage='info' />
      <form className='form-container'>
        <div className='fields-container'>
          <div className='form-group'>
            <label htmlFor='firstName' className='form-field my-2'>
              <p className='form-label'> First Name </p>
              <input
                type='text'
                className='form-control pl-2'
                id='firstName'
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='lastName' className='form-field my-2'>
              <p className='form-label'> Last Name </p>
              <input
                type='text'
                className='form-control pl-2'
                id='lastName'
                value='LastName'
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='form-field my-2'>
              <p className='form-label'> Email </p>
              <input
                type='email'
                className='form-control pl-2'
                id='email'
                value='Email@Email.com'
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-field my-2'>
              <p className='form-label'> Password </p>
              <input
                type='text'
                className='form-control pl-2'
                id='password'
                value='******'
              />
            </label>
          </div>
          <div className='d-flex flex-row my-2'>
            <p style={{ width: '40%' }}>Choose your account type:</p>
            <div className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor='accountTypePro'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='accountType'
                  id='accountTypePro'
                  value='Pro'
                />
                Pro
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor='accountTypeBasic'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='accountType'
                  id='accountTypeBasic'
                  value='Basic'
                />
                Basic
              </label>
            </div>
          </div>
        </div>
        <button type='button' className='btn btn-primary mb-4'>
          Update
        </button>
      </form>
    </>
  );
}

export default ProfileInfo;
