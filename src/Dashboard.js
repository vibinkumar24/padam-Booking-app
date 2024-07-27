import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import axios from 'axios';
import Image1 from "./padamBooking.png";
import Image2 from "./face.jpg";
import Image3 from "./twi.jpg";
import Image4 from "./insta.jpg";
import Image5 from "./noresponse.jpg";



function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/movie/getAll');
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(term.toLowerCase()) ||
      movie.genre.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filtered);

    if (filteredMovies == null) {
      document.querySelector('#no-response').innerHTML = "No Response";
    }

  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  return (
    <>
      <div class="grid-container">
        <div class="grid-item item1">
          <header id='header'><img id='title' src={Image1} alt="Title" />
            <form onSubmit={handleSearch}>
              <input
                class="mainLoginInput"
                placeholder='     &#61442;    Search  Movies'
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button type="submit" class="search-btn">Search</button>
              <Link to="admin-login" id='to-login'>Admin login</Link>
            </form>
          </header>
        </div>
        <div class="grid-item item2">
          {filteredMovies.length > 0 ? (
            filteredMovies.map(movie => (
              <div key={movie.id}>
                <Link style={{textDecoration: 'none'}} to={`/movie/${movie.id}/${movie.title}`}>
                  <img className="img-frame" src={movie.imageUrl} alt={movie.title} />
                  <h3 className="movie-info">{movie.title}</h3>
                  <h4 className="movie-info genre">{movie.genre}</h4>
                </Link>
              </div>
            ))
          ) : (
            <img style={{marginLeft:'31%'}} src={Image5}></img>
            
          )}
        </div>
        <div class="grid-item item5">
          <footer>
            <div class="footerPadamBooking-line">
              <img id='footer-padamBooking-img' src={Image1} alt="PadamBooking" />
            </div>
            <p class='copy-rights'>Copyright 2024 &#169; PadamBooking All Rights Reserved.</p>
            <div id="social-div">
              <a href={"https://www.facebook.com/"}><img class='social-media' src={Image2}></img></a>
              <a href={"https://x.com/?lang=en"}><img class='social-media' src={Image3}></img></a>
              <a href={"https://www.instagram.com/"}><img class='social-media' src={Image4}></img></a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;