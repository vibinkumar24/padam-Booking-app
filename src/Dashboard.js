import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Image1 from "./padamBooking.png";

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
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  return (
    <>
      <div class="grid-container">
        <div class="grid-item item1">
          <header id='header'>
            <img id='title' src={Image1} alt="Title" />
            <form onSubmit={handleSearch}>
              <input 
                class="mainLoginInput" 
                placeholder='&#61442;  Search Movies & Theaters' 
                type="text" 
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button type="submit" class="search-btn">Search</button>
            </form>
          </header>
          <hr />
        </div>
        <div class="grid-item item2">
          {filteredMovies.map(({ id, imageUrl, genre, title }) => (
            <div key={id}>
              <a href="#">
              <img class="img-frame" src={imageUrl} alt={title} />
              </a>
              <h3 class="movie-info">{title}</h3>
              <h4 class="movie-info genre">{genre}</h4>
            </div>
          ))}
        </div>
        <div class="grid-item item5">
          <footer>
            <div class="footerPadamBooking-line">
              <img id='footer-padamBooking-img' src={Image1} alt="PadamBooking" />
            </div>
            <p class='copy-rights'>Copyright 2024 &#169; PadamBooking All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;