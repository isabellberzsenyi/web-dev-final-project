import React, { useState } from 'react';
import Register from './Register';

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
              htmlFor='email'
              style={{ display: 'flex', marginBottom: '2em', marginTop: '2em' }}
            >
              <p style={{ width: '30%' }}>Email address</p>
              <input
                type='email'
                className='form-control'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Enter email'
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
            <label htmlFor='exampleInputPassword1' style={{ display: 'flex', marginBottom: '2em' }}>
              <p style={{ width: '30%' }}>Password</p>
              <input
                type='password'
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
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
        </div>
        <button
          type='submit'
          className='btn btn-primary'
          style={{ marginBottom: '2em' }}
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      <button
        type='button'
        className='btn btn-link'
        onClick={() => setRegister(true)}
        style={{ border: 'none', marginBottom: '2em' }}
      >
        Not a user? Register now.
      </button>
    </div>
  );
}

export default Login;
