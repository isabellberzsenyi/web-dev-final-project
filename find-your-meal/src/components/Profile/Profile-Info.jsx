/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';
import { useProfile } from '../../contexts/profile-context';
import { findUserById } from '../../service/user-service';

function ProfileInfo() {
  const { profile } = useProfile();
  const { updateUser } = useProfile();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: [''],
  });
  const { userId } = useParams();
  const fetchUserInfoById = async () => {
    const response = await findUserById(userId);
    setUserInfo(response);
    setIsCurrentUser(profile._id === userId);
  };

  const onSubmit = async () => {
    await updateUser(
      userId,
      userInfo.email,
      userInfo.password,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.accountType,
    );
  };

  useEffect(() => {
    fetchUserInfoById();
  }, []);

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
                value={userInfo.firstName}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    firstName: e.target.value,
                  });
                }}
                disabled={!isCurrentUser}
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
                value={userInfo.lastName}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    lastName: e.target.value,
                  });
                }}
                disabled={!isCurrentUser}
              />
            </label>
          </div>
          {isCurrentUser && (
            <>
              <div className='form-group'>
                <label htmlFor='email' className='form-field my-2'>
                  <p className='form-label'> Email </p>
                  <input
                    type='email'
                    className='form-control pl-2'
                    id='email'
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        email: e.target.value,
                      });
                    }}
                    disabled={!isCurrentUser}
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
                    value={userInfo.password}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        password: e.target.value,
                      });
                    }}
                    disabled={!isCurrentUser}
                  />
                </label>
              </div>
            </>
          )}
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
                  checked={userInfo.accountType[0] === 'pro'}
                  onChange={(_) => {
                    setUserInfo({
                      ...userInfo,
                      accountType: ['pro'],
                    });
                  }}
                  disabled={!isCurrentUser}
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
                  checked={userInfo.accountType[0] === 'basic'}
                  onChange={(_) => {
                    setUserInfo({
                      ...userInfo,
                      accountType: ['basic'],
                    });
                  }}
                  disabled={!isCurrentUser}
                />
                Basic
              </label>
            </div>
          </div>
        </div>
        {isCurrentUser && (
          <button type='button' className='btn btn-primary mb-4' onClick={onSubmit}>
            Update
          </button>
        )}
      </form>
    </>
  );
}

export default ProfileInfo;
