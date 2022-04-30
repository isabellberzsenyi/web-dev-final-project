import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/profile-context';
import * as likeService from '../service/like-service';
import NavBar from './NavBar';

function Details() {
  const [signedIn, setSignedIn] = useState(false);
  const { profile } = useProfile();
  const navigate = useNavigate();

  const [mealDetails, setMealDetails] = useState({});
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i';
  const { idMeal } = useParams();
  const fetchMealByID = async () => {
    const response = await axios(`${API_URL}=${idMeal}`);
    setMealDetails(response.data);
  };

  const [ingredientList, setIngredientList] = useState({});

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

  const [currLikes, setCurrLikes] = useState(0);
  const getTotalLikes = async () => {
    const likes = await likeService.getMealLikes({ idMeal });
    setCurrLikes(likes.length);
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
  }, [currLikes]);

  return (
    <>
      <NavBar currentPage='' />
      <div className="bg-primary container">
        <div className="d-flex row">
          <div className="col-sm-12 col-md-8">
            <div className="d-flex align-items-end">
              <img
                src={mealDetails.meals && mealDetails.meals[0].strMealThumb}
                height={200}
                width={200}
                className="ms-5 mt-2 rounded"
                alt=""
              />
              <div>
                <h2 className="ms-2 me-5">{mealDetails.meals && mealDetails.meals[0].strMeal}</h2>
                <p className="fw-bold text-secondary ms-2 me-5">Category: {mealDetails.meals && mealDetails.meals[0].strCategory}  <span className="fst-normal"> |</span> Cuisine: {mealDetails.meals && mealDetails.meals[0].strArea}</p>
              </div>
            </div>
            <hr className="border-dark ms-5 me-5" style={{ color: 'black' }} />
            <p className="text-black ms-5 me-5 pb-1">{mealDetails.meals && mealDetails.meals[0].strInstructions}</p>
            <hr className="border-dark ms-5 me-5" style={{ color: 'black' }} />
          </div>
          <div className="col-sm-12 col-md-3 me-5 mt-2 align-self-center">
            <ul className="list-group">
              <li className="list-group-item disabled fw-bold text-decoration-underline text-primary bg-secondary border border-primary">Ingredients</li>
              {
                ingredientList.map && ingredientList.map((ingredientItem) => <li className="list-group-item bg-dark border border-primary" key={ingredientItem}>{ingredientItem}</li>)
              }
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <p className="fw-bold text-black ms-5 pb-3"><i className="fas fa-heart text-info" /> <i className="fas fa-heart-broken text-secondary" /> { currLikes }</p>
        </div>
      </div>
      {!(signedIn && profile) ? (
        <div className="card">
          <div className="card-header">
            <h5>Write a comment</h5>
            <div className="d-flex flex-column ms-2 me-2 pb-2">
              <textarea disabled className="form-control" value="Want to be able to see and leave comments on your favorite meals? Sign up today using the link below!" />
              <button type='button' className='btn btn-link' onClick={() => navigate('/register')}>
                Register now.
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            <h5>Write a comment</h5>
            <div className="d-flex flex-column ms-2 me-2 pb-2">
              {(profile.accountType.type !== 'pro') ? (
                <div>
                  <textarea disabled className="form-control" value="Want to be able to leave comments on your favorite meals? Upgrade to a Pro account by using the link below!" />
                  <button type='button' className='btn btn-link' onClick={() => navigate('/profile')}>
                    Need to upgrade to Pro? Change your settings here!
                  </button>
                </div>
              ) : (
                <div>
                  <textarea className="form-control" />
                  <button type="button" className="btn btn-primary">
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
          <ul className="list-group">
            <li className="list-group-item mb-2">
              <p className="fw-bold">Username1</p>
              <p>Love it</p>
            </li>
            <li className="list-group-item mb-2">
              <p className="fw-bold">Username2</p>
              <p>Love it</p>
            </li>
            <li className="list-group-item">
              <p className="fw-bold">Username3</p>
              <p>Love it</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Details;
