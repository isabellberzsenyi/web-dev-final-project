import React, { useState } from 'react';

function Register({ setRegister }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    accountType: '',
  });

  function onSubmit() {
    console.log({ form });
  }

  return (
    <div>
      <h1>Register</h1>
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
                onChange={(e) => {
                  setForm({
                    ...form,
                    firstName: e.target.value,
                  });
                }}
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
                onChange={(e) => {
                  setForm({
                    ...form,
                    lastName: e.target.value,
                  });
                }}
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
              <p className='form-label'>Password:</p>
              <input
                type='password'
                className='form-control pl-2'
                id='password'
                placeholder='Enter your password'
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
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
                    setForm({
                      ...form,
                      accountType: 'pro',
                    });
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
                    setForm({
                      ...form,
                      accountType: 'basic',
                    });
                  }}
                />
                Basic
              </label>
            </div>
          </div>
        </div>
        <button
          type='button'
          // type="submit"
          className='btn btn-primary mb-4'
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      <button type='button' className='btn btn-link' onClick={() => setRegister(false)}>
        Already have an account? Login.
      </button>
    </div>
  );
}

export default Register;
