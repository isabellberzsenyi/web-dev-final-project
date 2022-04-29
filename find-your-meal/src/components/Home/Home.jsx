import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import './Home.css';
import { useProfile } from '../../contexts/profile-context';
import * as likeService from '../../service/like-service';

function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const { profile } = useProfile();
  console.log(profile);

  const [userLikes, setUserLikes] = useState([]);
  const [generalLikes, setGeneralLikes] = useState([]);

  const API = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

  const findAllMeals = async () => {
    let allMeals = [];

    // generate the alphabet and fills array of all meals
    // eslint-disable-next-line no-plusplus
    for (let i = 97; i < 123; i++) {
      const letter = String.fromCharCode(i);
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${API}${letter}`);

      if (response.data.meals != null) {
        allMeals = allMeals.concat(response.data.meals);
      }
    }

    // updates all meals with likes
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < allMeals.length; i++) {
      const meal = allMeals[i];
      // eslint-disable-next-line no-await-in-loop
      meal.likes = await likeService.getMealLikes(meal.idMeal).length;
    }

    // sorts the meals from most liked to least
    allMeals.sort((a, b) => b.likes - a.likes);

    const generalTempArr = [];
    generalTempArr.push(allMeals[0]);
    generalTempArr.push(allMeals[1]);
    generalTempArr.push(allMeals[2]);
    setGeneralLikes(generalTempArr);

    // find UserMeals //

    const userMeals = [];

    // if there is a profile, find all the meals user likes
    // eslint-disable-next-line no-underscore-dangle
    if (profile) {
      // eslint-disable-next-line no-underscore-dangle
      userMeals.concat(likeService.getUserLikes(profile._id));
    }

    const userTempArr = [];

    if (userMeals.length !== 0) {
      userTempArr.push(userMeals[0]);
      userTempArr.push(userMeals[1]);
      userTempArr.push(userMeals[2]);
    }

    setUserLikes(userTempArr);
  };
  useEffect(() => {
    findAllMeals();
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
        {/* eslint-disable-next-line no-nested-ternary */}
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
          (userLikes.length === 0)
            ? (<h5> Like some recipes to see them here! </h5>)
            : (
              userLikes.map((meal) => (
                <div className='card'>
                  <img src={meal.strMealThumb} alt={meal.strMeal} className='card-img' />
                  <div className='container'>
                    <h5>{meal.strMeal}</h5>
                    <h6>{meal.strCategory}</h6>
                  </div>
                </div>
              ))
            ))}
      </div>
      <br />
    </>
  );
}

export default Home;
