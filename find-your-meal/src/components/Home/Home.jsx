import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import './Home.css';
import { useProfile } from '../../contexts/profile-context';
import * as likeService from '../../service/like-service';

function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const { profile } = useProfile();

  const [likedMeals, setLikedMeals] = useState([]);

  const API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

  const findLikes = async () => {
    // generate the alphabet
    let allMeals = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 97; i < 123; i++) {
      const letter = String.fromCharCode(i);
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${API}${letter}`);

      if (response.data.meals != null) {
        allMeals = allMeals.concat(response.data.meals);
      }
    }

    const meal = allMeals[0];
    console.log(meal);
    console.log(meal.idMeal);
    console.log(likeService.getMealLikes(meal.idMeal));

    allMeals.sort((a, b) => a.likes - b.likes);

    const tempArr = [];
    tempArr.add(allMeals[0]);
    tempArr.add(allMeals[1]);
    tempArr.add(allMeals[2]);
    setLikedMeals(tempArr);

    // profile._id --> get current user id
  };
  useEffect(() => {
    findLikes();
  }, []);

  useEffect(() => {
    setSignedIn(!profile);
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
      {!(signedIn && profile) ? (<h3>Most Liked Meals</h3>) : (<h3>Your Liked Meals</h3>) }
      <div className='row'>
        {
        likedMeals.map((meal) => (
          <div className='card'>
            <img src={meal.strMealThumb} alt={meal.strMeal} className='card-img' />
            <div className='container'>
              <h5>{meal.strMeal}</h5>
              <h6>{meal.strCategory}</h6>
            </div>
          </div>
        ))
      }
      </div>
      <br />
    </>
  );
}

export default Home;
