/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import ProfileNavBar from './Profile-NavBar';
import { useProfile } from '../../contexts/profile-context';
import * as commentService from '../../service/comments-service';

function ProfileComments() {
  const { profile } = useProfile();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userComments, setUserComments] = useState([]);
  const API_LOOKUP = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const findUserComments = async () => {
    const searchId = userId || profile._id;
    let userCommentData = [];

    // retrieves all of the comments a user has made
    if (searchId) {
      userCommentData = await commentService.getUserComments(searchId);
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
        {profile.accountType[0] === 'basic' ? (
          <button
            type='button'
            className='btn btn-link'
            onClick={() => navigate(`/profile/${userId}`)}
          >
            Upgrade to pro to see comments
          </button>
        ) : (
          userComments.map((data) => (
            <div
              className='card card-home card-click'
              onClick={() => navigate(`/details/${data.mealId}`)}
            >
              <img
                src={data.meal.data.meals[0].strMealThumb}
                alt={data.meal.data.meals[0].strMeal}
                className='card-img'
              />
              <div className='container'>
                <h5>{data.meal.data.meals[0].strMeal}</h5>
                <h6>{data.comment}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ProfileComments;
