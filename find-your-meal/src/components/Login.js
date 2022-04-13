import React, { useState } from 'react';
import Register from './Register';
import './login.css';

function Login() {
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  function onSubmit() {
    console.log({ form });
  }

  if (register) {
    return <Register setRegister={setRegister} />;
  }

  return (
    <div>
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
                onChange={(e) => {
                  setForm({
                    ...form,
                    email: e.target.value,
                  });
                }}
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
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
              />
            </label>
          </div>
        </div>
        <button type='submit' className='btn btn-primary mb-4' onClick={onSubmit}>
          Submit
        </button>
      </form>
      <button type='button' className='btn btn-link' onClick={() => setRegister(true)}>
        Not a user? Register now.
      </button>
    </div>
  );
}

export default Login;
