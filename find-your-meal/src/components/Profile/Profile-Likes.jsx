/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';
import * as likeService from '../../service/like-service';
import { useProfile } from '../../contexts/profile-context';

function ProfileLikes() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [userLikes, setUserLikes] = useState([]);
  const API_LOOKUP = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const { userId } = useParams();

  const findUserLikes = async () => {
    const searchId = userId || profile._id;
    const userMeals = [];
    let userMealsId = [];

    // if there is a profile, find all the meals user likes
    if (searchId) {
      // eslint-disable-next-line no-underscore-dangle
      userMealsId = await likeService.getUserLikes(searchId);
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
      <div className='row'>
        {userLikes.length === 0 ? (
          <h5> Like some recipes to see them here! </h5>
        ) : (
          userLikes.map((meal) => (
            <div
              className='card card-click card-home'
              onClick={() => {
                navigate(`/details/${meal.idMeal}`);
              }}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className='card-img' />
              <div className='container'>
                <h5>{meal.strMeal}</h5>
                <h6>{meal.strCategory}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProfileLikes;
