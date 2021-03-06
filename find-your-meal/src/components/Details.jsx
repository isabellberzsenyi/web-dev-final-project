import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/profile-context';
import * as likeService from '../service/like-service';
import * as commentService from '../service/comments-service';
import NavBar from './NavBar';

function Details() {
  const { profile } = useProfile();
  const [signedIn, setSignedIn] = useState(false);
  const [currLikes, setCurrLikes] = useState([]);
  const [userLike, setUserLike] = useState(profile && currLikes.includes(profile._id));
  const [ingredientList, setIngredientList] = useState({});
  const navigate = useNavigate();

  const [mealDetails, setMealDetails] = useState({});
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i';
  const { idMeal } = useParams();
  const fetchMealByID = async () => {
    const response = await axios(`${API_URL}=${idMeal}`);
    setMealDetails(response.data);
  };

  const getIngredients = async () => {
    const tempIngredientList = [];
    for (let i = 1; i < 21; i += 1) {
      const listNum = `strIngredient${i}`;
      if (mealDetails.meals && mealDetails.meals[0][listNum]) {
        tempIngredientList.push(mealDetails.meals[0][listNum]);
      }
    }
    setIngredientList(tempIngredientList);
  };

  const getTotalLikes = async () => {
    const likes = await likeService.getMealLikes(idMeal);
    const userIdLikes = likes.map((l) => l.userId);
    setCurrLikes(userIdLikes);
    setUserLike(profile && currLikes.includes(profile._id));
  };

  const handleLikes = async () => {
    const mealId = idMeal;
    const userId = profile._id;
    const response = await likeService.toggleLikeMeal(mealId, userId);
    setUserLike(!!response.data);
  };

  const [mealComments, setMealComments] = useState([]);
  const findMealComments = async () => {
    let mealCommentData = [];
    mealCommentData = await commentService.getMealComments(idMeal);
    setMealComments(mealCommentData);
  };

  const commentRef = useRef();
  const handleComment = async () => {
    const actualComment = await commentService.createComment(
      idMeal,
      profile._id,
      commentRef.current.value,
    );
    setMealComments([...mealComments, actualComment]);
  };

  useEffect(() => {
    fetchMealByID();
  }, []);

  useEffect(() => {
    getIngredients();
  }, [mealDetails]);

  useEffect(() => {
    setSignedIn(!!profile);
  }, [profile]);

  useEffect(() => {
    getTotalLikes();
  }, [currLikes, userLike]);

  useEffect(() => {
    findMealComments();
  }, [mealComments]);

  const renderComments = () =>
    mealComments.map((comment) => (
      <li className='list-group-item mb-2'>
        <button
          type='button'
          className='btn btn-link fw-bold'
          onClick={() => navigate(`/profile/${comment.userId}`)}
        >
          {comment.firstName} {comment.lastName}
        </button>
        <p>{comment.comment}</p>
      </li>
    ));

  const renderCommentedUsers = () =>
    mealComments
      .filter((c) => c.firstName && c.lastName)
      .map((comment) => (
        <li className='list-group-item mb-2'>
          <button
            type='button'
            className='btn btn-link fw-bold'
            onClick={() => navigate(`/profile/${comment.userId}`)}
          >
            User {comment.firstName} {comment.lastName} left a comment
          </button>
        </li>
      ));

  return (
    <>
      <NavBar currentPage='' />
      <button className='btn btn-primary' type='button' onClick={() => navigate('/search')}>
        Back to Search
      </button>
      <div className='bg-primary container'>
        <div className='d-flex row'>
          <div className='col-sm-12 col-md-8'>
            <div className='d-flex align-items-end'>
              <img
                src={mealDetails.meals && mealDetails.meals[0].strMealThumb}
                height={200}
                width={200}
                className='ms-5 mt-2 rounded'
                alt=''
              />
              <div>
                <h2 className='ms-2 me-5'>{mealDetails.meals && mealDetails.meals[0].strMeal}</h2>
                <p className='fw-bold text-secondary ms-2 me-5'>
                  Category: {mealDetails.meals && mealDetails.meals[0].strCategory}{' '}
                  <span className='fst-normal'> |</span> Cuisine:{' '}
                  {mealDetails.meals && mealDetails.meals[0].strArea}
                </p>
              </div>
            </div>
            <hr className='border-dark ms-5 me-5' style={{ color: 'black' }} />
            <p className='text-black ms-5 me-5 pb-1'>
              {mealDetails.meals && mealDetails.meals[0].strInstructions}
            </p>
            <hr className='border-dark ms-5 me-5' style={{ color: 'black' }} />
            {!(signedIn && profile) ? (
              <div className='mt-2 mb-2'>
                <span className='text-black fw-bold ms-5'> Likes: {currLikes.length} </span>
                <br />
                <span className='text-secondary fst-italic ms-5'>
                  Love this meal? Sign up now to give it a like!{' '}
                </span>
                <br />
                <button
                  type='button'
                  className='btn btn-secondary text-primary ms-5'
                  onClick={() => navigate('/register')}
                >
                  Register Now.
                </button>
              </div>
            ) : (
              <div className='mb-2'>
                <button
                  type='button'
                  onClick={handleLikes}
                  className='btn btn-primary fw-bold text-black ms-5 mb-3'
                >
                  {userLike && <i className='fas fa-heart text-info' />}
                  {!userLike && <i className='far fa-heart text-info' />}
                  <span> {currLikes.length}</span>
                </button>
                <br />
                <span className='text-secondary fst-italic ms-5'>
                  Love this meal? Click the heart above to like it!
                </span>
              </div>
            )}
          </div>
          <div className='col-sm-12 col-md-3 me-5 mt-2 mb-2 align-self-center'>
            <ul className='list-group'>
              <li className='list-group-item disabled fw-bold text-decoration-underline text-primary bg-secondary border border-primary'>
                Ingredients
              </li>
              {ingredientList.map &&
                ingredientList.map((ingredientItem) => (
                  <li
                    className='list-group-item bg-dark border border-primary'
                    key={ingredientItem}
                  >
                    {ingredientItem}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      {!(signedIn && profile) ? (
        <div className='card'>
          <div className='card-header'>
            <div className='d-flex flex-column ms-2 me-2 pb-2'>
              <textarea
                disabled
                className='form-control'
                value='These users left a comment, log in to see what they said! Sign up today using the link below!'
              />
              <button type='button' className='btn btn-link' onClick={() => navigate('/register')}>
                Register now.
              </button>
            </div>
            {renderCommentedUsers()}
          </div>
        </div>
      ) : (
        <div className='card'>
          <div className='card-header'>
            <h5>Write a comment</h5>
            <div className='d-flex flex-column ms-2 me-2 pb-2'>
              {profile && profile.accountType[0] !== 'pro' ? (
                <div>
                  <textarea
                    disabled
                    className='form-control'
                    value='Want to be able to leave comments on your favorite meals? Upgrade to a Pro account by using the link below!'
                  />
                  <button
                    type='button'
                    className='btn btn-link'
                    onClick={() => navigate(`/profile/${profile._id}`)}
                  >
                    Need to upgrade to Pro? Change your settings here!
                  </button>
                </div>
              ) : (
                <div>
                  <textarea
                    ref={commentRef}
                    className='form-control mb-1'
                    placeholder='Let us know what you think!'
                  />
                  <button onClick={handleComment} type='button' className='btn btn-primary w-100'>
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
          <ul className='list-group'>
            {mealComments.length > 0 ? (
              renderComments()
            ) : (
              <div className='center'>
                <h4>Leave a comment!</h4>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Details;
