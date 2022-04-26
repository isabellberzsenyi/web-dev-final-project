import React, { useEffect, useState } from 'react';

import NavBar from '../NavBar';
import './Home.css';
import { useProfile } from '../../contexts/profile-context';

function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const { profile } = useProfile();

  useEffect(() => {
    setSignedIn(!!profile);
  }, [profile]);
  return (
    <>
      <NavBar currentPage='home' />
      <br />
      <div className='banner center'>
        <div>
          <h1> <b> Find Your Meal </b> </h1>
          <form className='center'>
            <input type='text' value='' />
            <input type='button' value='Search' />
          </form>
        </div>
      </div>
      <br />
      {!(signedIn && profile) ? (
        <>
          <h3>Most Liked Meals</h3>
          <div className='row'>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3>Your Liked Meals</h3>
          <div className='row'>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
            <div className='card'>
              <img src='https://www.themealdb.com/images/ingredients/Lime.png' alt='most liked meal' className='card-img' />
              <div className='container'>
                <h5>Meal Name</h5>
                <h6>Category</h6>
              </div>
            </div>
          </div>
        </>
      )}
      <br />
    </>
  );
}

export default Home;
