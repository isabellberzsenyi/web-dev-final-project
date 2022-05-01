import React, { useState } from 'react';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';
import { useProfile } from '../../contexts/profile-context';

function ProfileInfo() {
  const { profile } = useProfile();
  const { updateUser } = useProfile();
  // eslint-disable-next-line no-underscore-dangle
  const [userId, setUserId] = useState(profile._id);
  const [accountType, setAccountType] = useState(profile.accountType);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState(profile.password);

  const onSubmit = async () => {
    // eslint-disable-next-line no-underscore-dangle
    setUserId(profile._id);
    await updateUser(
      // eslint-disable-next-line no-underscore-dangle
      userId,
      email,
      password,
      firstName,
      lastName,
      accountType,
    );
  };

  return (
    <>
      <NavBar currentPage='info' />
      <h1> Profile </h1>
      <ProfileNavBar currentPage='info' />
      <form className='form-container'>
        <div className='fields-container'>
          <div className='form-group'>
            <label htmlFor='firstName' className='form-field my-2'>
              <p className='form-label'> First Name: </p>
              <input
                type='text'
                className='form-control pl-2'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-field my-2'>
              <p className='form-label'> Password </p>
              <input
                type='password'
                className='form-control pl-2'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className='d-flex flex-row my-2'>
            <p style={{ width: '40%' }}>Account type:</p>
            <div className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor='accountTypePro'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='accountType'
                  id='accountTypePro'
                  value='Pro'
                  checked={accountType[0] === 'pro'}
                  onChange={() => {
                    setAccountType(['pro']);
                  }}
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
                  checked={accountType[0] === 'basic'}
                  onChange={() => {
                    setAccountType(['basic']);
                  }}
                />
                Basic
              </label>
            </div>
          </div>
        </div>
        <button type='button' className='btn btn-primary mb-4' onClick={onSubmit}>
          Update
        </button>
      </form>
    </>
  );
}

export default ProfileInfo;
