import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import './Home.css';
import { useProfile } from '../../contexts/profile-context';
import * as likeService from '../../service/like-service';

function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const { profile } = useProfile();

  const [userLikes, setUserLikes] = useState([]);
  const [generalLikes, setGeneralLikes] = useState([]);

  const API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

  const findLikes = async () => {
    let generalMeals = [];
    // generate the alphabet
    // eslint-disable-next-line no-plusplus
    for (let i = 97; i < 123; i++) {
      const letter = String.fromCharCode(i);
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${API}${letter}`);

      if (response.data.meals != null) {
        generalMeals = generalMeals.concat(response.data.meals);
      }
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < generalMeals.length; i++) {
      const meal = generalMeals[i];
      // eslint-disable-next-line no-await-in-loop
      meal.likes = await likeService.getMealLikes(meal.idMeal).length;
    }

    generalMeals.sort((a, b) => b.likes - a.likes);

    const generalTempArr = [];
    generalTempArr.push(generalMeals[0]);
    generalTempArr.push(generalMeals[1]);
    generalTempArr.push(generalMeals[2]);
    setGeneralLikes(generalTempArr);

    const userMeals = [];
    // eslint-disable-next-line no-underscore-dangle
    if (profile) {
      // eslint-disable-next-line no-underscore-dangle
      userMeals.concat(likeService.getUserLikes(profile._id));
    }

    const userTempArr = [];
    userTempArr.push(userMeals[0]);
    userTempArr.push(userMeals[1]);
    userTempArr.push(userMeals[2]);
    setUserLikes(userTempArr);

    // profile._id --> get current user id
  };
  useEffect(() => {
    findLikes();
  }, []);

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
      {!(signedIn && profile) ? (<h3>Most Liked Meals</h3>) : (<h3>Your Liked Meals</h3>) }
      <div className='row'>
        { !(signedIn && profile) ? (
          generalLikes.map((meal) => (
            <div className='card'>
              <img src={meal.strMealThumb} alt={meal.strMeal} className='card-img' />
              <div className='container'>
                <h5>{meal.strMeal}</h5>
                <h6>{meal.strCategory}</h6>
              </div>
            </div>
          ))) : (
          userLikes.map((meal) => (
            <div className='card'>
              <img src={meal.strMealThumb} alt={meal.strMeal} className='card-img' />
              <div className='container'>
                <h5>{meal.strMeal}</h5>
                <h6>{meal.strCategory}</h6>
              </div>
            </div>
          )))}
      </div>
      <br />
    </>
  );
}

export default Home;
