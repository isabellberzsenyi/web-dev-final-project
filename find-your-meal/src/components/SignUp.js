import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/profile-context';
import NavBar from './NavBar';

function Register() {
  const navigate = useNavigate();
  const { signup } = useProfile();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [accountType, setAccountType] = useState();

  const onSubmit = async () => {
    await signup(
      emailRef.current.value,
      passwordRef.current.value,
      firstNameRef.current.value,
      lastNameRef.current.value,
      accountType,
    );
    navigate('/');
  };

  return (
    <div>
      <NavBar currentPage='signup' />
      <h1>Sign Up</h1>
      <form className='form-container'>
        <div className='fields-container'>
          <div className='form-group'>
            <label htmlFor='firstName' className='form-field my-4'>
              <p className='form-label'>First Name:</p>
              <input
                type='text'
                className='form-control pl-2'
                id='firstName'
                aria-describedby='name help'
                placeholder='Enter your first name'
                ref={firstNameRef}
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='lastName' className='form-field my-4'>
              <p className='form-label'>Last Name:</p>
              <input
                type='text'
                className='form-control pl-2'
                id='lastName'
                aria-describedby='name help'
                placeholder='Enter your last name'
                ref={lastNameRef}
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='email' className='form-field mb-4'>
              <p className='form-label'>Email:</p>
              <input
                type='email'
                className='form-control pl-2'
                id='email'
                placeholder='Enter your email'
                ref={emailRef}
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-field mb-4'>
              <p className='form-label'>Password:</p>
              <input
                type='password'
                className='form-control pl-2'
                id='password'
                placeholder='Enter your password'
                ref={passwordRef}
              />
            </label>
          </div>
          <div className='d-flex flex-row'>
            <p style={{ width: '40%' }}>Choose your account type:</p>
            <div className='form-check form-check-inline'>
              <label className='form-check-label' htmlFor='accountTypePro'>
                <input
                  className='form-check-input'
                  type='radio'
                  name='accountType'
                  id='accountTypePro'
                  value='Pro'
                  onChange={() => {
                    setAccountType('pro');
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
                  onChange={() => {
                    setAccountType('basic');
                  }}
                />
                Basic
              </label>
            </div>
          </div>
        </div>
        <button type='button' className='btn btn-primary mb-4' onClick={onSubmit}>
          Submit
        </button>
      </form>
      <button type='button' className='btn btn-link' onClick={() => navigate('/login')}>
        Already have an account? Login.
      </button>
    </div>
  );
}

export default Register;
