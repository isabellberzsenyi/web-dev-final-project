import React, { useState } from 'react';

function Login() {
  const [register, setRegister] = useState(false);
  // const [form, setForm] = useState({
  //   email: '',
  //   password: '',
  // });
  if (register) {
    return (
      <div>
        <button type='button' onClick={() => setRegister(false)}>
          Already have an account? Login.
        </button>
      </div>
    );
  }
  return (
    <div>
      <button type='button' onClick={() => setRegister(true)}>
        Not a user? Register now.
      </button>
    </div>
  );
}

export default Login;
