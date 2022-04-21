import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Home.css';

function Home() {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const [theMeals, setMeals] = useState([]);
  const nameRef = useRef();

  const getMostLikedMeals = async () => {
    const response = await axios.get(`${API_URL}=${nameRef.current.value}`);
    setMeals(response.data.meals);
  };

  useEffect(() => {
    getMostLikedMeals();
  }, []);

  return (
    <>
      <NavBar currentPage='home' />
      <div className='banner center'>
        <div>
          <h1> <b> Find Your Meal </b> </h1>
          <form className='center'>
            <input type='text' value='' />
            <input type='button' value='Search' />
          </form>
        </div>
      </div>
      <div>
        <h3> Most Liked Meals </h3>
        <div className='row'>
          {
            theMeals.map((meal) => (
              <div className="card col-4" key={meal.idMeal}>
                <Link to={`/details/${meal.idMeal}`}>
                  <img src={meal.strMealThum} alt="most liked meal" />
                  <div className="container">
                    <h4>{meal.strMeal}</h4>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Home;
