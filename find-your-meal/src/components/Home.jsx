import React, { useState, useEffect } from 'react';
import example from '../service/service';
import NavBar from './NavBar';

function Home() {
  const [apiText, setApiText] = useState();
  const apiExample = async () => {
    await example().then((r) => {
      setApiText(r.data);
    });
  };

  useEffect(() => {
    apiExample();
  }, []);
  return (
    <>
      <NavBar currentPage='home' />
      <h1>Home Page</h1>
      <div>
        <p>from API: {apiText}</p>
      </div>
    </>
  );
}

export default Home;
