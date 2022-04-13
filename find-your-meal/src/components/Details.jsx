import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';

function Details() {
  return (
    <>
      <nav className="nav nav-tabs d-flex">
        <Link className="nav-link p-2" to='/'>Home</Link>
        <Link className="nav-link me-auto p-2" to='search'>Search</Link>
        <Link className="nav-link p-2" to='/'>Login</Link>
        <Link className="nav-link p-2" to='/'>Sign Up</Link>
      </nav>
      <div className="bg-primary">
        <h1 className="ms-5">Name of Meal</h1>
        <p className="fst-italic text-black ms-5">Category:</p>
        <p className="text-black ms-5 me-5 pb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Mauris quis molestie massa. Aliquam elementum tempus felis
          vestibulum consequat. Integer sollicitudin purus sem, tempus
          cursus eros posuere in. Duis et nibh quis erat fermentum elementum a et libero.
        </p>
        <div>
          <p className="fst-italic text-decoration-underline text-black ms-5 pb-3">Likes: 342 | Dislikes: 32</p>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h5>Write a comment</h5>
          <div className="d-flex flex-column ms-2 me-2 pb-2">
            <textarea className="form-control" />
            <button type="button" className="btn btn-primary">
              Post
            </button>
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
    </>
  );
}

export default Details;
