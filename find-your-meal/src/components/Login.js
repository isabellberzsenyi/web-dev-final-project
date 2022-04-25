import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './login.css';
import { useProfile } from '../contexts/profile-context';

function Login() {
  const navigate = useNavigate();
  const { signin } = useProfile();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async () => {
    await signin(emailRef.current.value, passwordRef.current.value);
    navigate('/');
  };

  return (
    <div>
      <NavBar currentPage='login' />
      <h1>Login</h1>
      <form className='form-container'>
        <div className='fields-container'>
          <div className='form-group'>
            <label htmlFor='email' className='form-field my-4'>
              <p className='form-label'>Email address</p>
              <input
                type='email'
                className='form-control pl-2'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                ref={emailRef}
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='form-field mb-4'>
              <p className='form-label'>Password</p>
              <input
                type='password'
                className='form-control pl-2'
                id='password'
                placeholder='Password'
                ref={passwordRef}
              />
            </label>
          </div>
        </div>
        <button type='button' className='btn btn-primary mb-4' onClick={onSubmit}>
          Submit
        </button>
      </form>
      <button type='button' className='btn btn-link' onClick={() => navigate('/register')}>
        Not a user? Register now.
      </button>
    </div>
  );
}

export default Login;
