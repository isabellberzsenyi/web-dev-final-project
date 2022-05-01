import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';
import { useProfile } from '../../contexts/profile-context';
import * as likeService from '../../service/like-service';

function ProfileLikes() {
  const { profile } = useProfile();
  const [userLikes, setUserLikes] = useState([]);
  const API_LOOKUP = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const findUserLikes = async () => {
    const userMeals = [];
    let userMealsId = [];

    // if there is a profile, find all the meals user likes
    if (profile) {
      // eslint-disable-next-line no-underscore-dangle
      userMealsId = await likeService.getUserLikes(profile._id);
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < userMealsId.length; i++) {
      const { mealId } = userMealsId[i];
      // eslint-disable-next-line no-await-in-loop
      const response = await axios.get(`${API_LOOKUP}${mealId}`);
      userMeals.push(response.data.meals[0]);
    }

    setUserLikes(userMeals);
  };

  useEffect(() => {
    findUserLikes();
  }, []);

  return (
    <>
      <NavBar currentPage='' />
      <h1> Profile </h1>
      <ProfileNavBar currentPage='likes' />
      <h3> Your Likes </h3>
      <div className='row'>
        { (userLikes.length === 0)
          ? (<h5> Like some recipes to see them here! </h5>)
          : (userLikes.map((meal) => (
            <div className='card'>
              <img src={meal.strMealThumb} alt={meal.strMeal} className='card-img' />
              <div className='container'>
                <h5>{meal.strMeal}</h5>
                <h6>{meal.strCategory}</h6>
              </div>
            </div>
          )))}
      </div>
    </>
  );
}

export default ProfileLikes;
