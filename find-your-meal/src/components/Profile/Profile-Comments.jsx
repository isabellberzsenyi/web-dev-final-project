import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';
import { useProfile } from '../../contexts/profile-context';
import * as commentService from '../../service/comments-service';

function ProfileComments() {
  const { profile } = useProfile();
  const [userComments, setUserComments] = useState([]);
  const API_LOOKUP = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const findUserComments = async () => {
    let userCommentData = [];

    // retrieves all of the comments a user has made
    if (profile) {
      // eslint-disable-next-line no-underscore-dangle
      userCommentData = await commentService.getUserComments(profile._id);
    }

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < userCommentData.length; i++) {
      const { mealId } = userCommentData[i];
      // eslint-disable-next-line no-await-in-loop
      userCommentData[i].meal = await axios.get(`${API_LOOKUP}${mealId}`);
    }

    setUserComments(userCommentData);
  };

  useEffect(() => {
    findUserComments();
  }, []);

  return (
    <>
      <NavBar currentPage='' />
      <h1> Profile </h1>
      <ProfileNavBar currentPage='comments' />
      <div className='row'>
        { (profile.accountType[0] === 'basic')
          ? (<h5> Switch to a Pro account to access comments! </h5>)
          : (userComments.map((data) => (
            <div className='card'>
              <img src={data.meal.data.meals[0].strMealThumb} alt={data.meal.data.meals[0].strMeal} className='card-img' />
              <div className='container'>
                <h5>{data.meal.data.meals[0].strMeal}</h5>
                <h6>{data.comment}</h6>
              </div>
            </div>
          )))}
      </div>
    </>
  );
}

export default ProfileComments;
