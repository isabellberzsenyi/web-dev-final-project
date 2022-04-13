import React, { useState } from 'react';

function Register({ setRegister }) {
  const [form, setForm] = useState({
    name: '',
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
      <form
        style={{
          textAlign: 'center',
          marginTop: '2em',
          border: '2px solid #adafae',
        }}
      >
        <div style={{ width: '80%' }}>
          <div className='form-group'>
            <label
              htmlFor='name'
              style={{ display: 'flex', marginBottom: '2em', marginTop: '2em' }}
            >
              <p style={{ width: '30%' }}>Name:</p>
              <input
                type='text'
                className='form-control'
                id='name'
                aria-describedby='name help'
                placeholder='Enter your name'
                style={{ paddingLeft: '1em' }}
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                  });
                }}
              />
            </label>
          </div>
          <div className='form-group'>
            <label htmlFor='email' style={{ display: 'flex', marginBottom: '2em' }}>
              <p style={{ width: '30%' }}>Email:</p>
              <input
                type='email'
                className='form-control'
                id='email'
                placeholder='Enter your email'
                style={{ paddingLeft: '1em' }}
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
            <label htmlFor='password' style={{ display: 'flex', marginBottom: '2em' }}>
              <p style={{ width: '30%' }}>Password:</p>
              <input
                type='password'
                className='form-control'
                id='password'
                placeholder='Enter your password'
                style={{ paddingLeft: '1em' }}
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
              />
            </label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
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
          className='btn btn-primary'
          style={{ marginBottom: '2em' }}
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
