import React, { useEffect, useState } from 'react';
import Image1 from "./padamBooking.png";
import "./Theater.css";
import Image2 from "./face.jpg";
import Image3 from "./twi.jpg";
import Image4 from "./insta.jpg";
import Image5 from "./giphy.gif";
import Image6 from "./noresponse.jpg";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Theaters() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [filteredTheaters, setFilteredTheaters] = useState([]);
  const navigate = useNavigate(); // Added useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [theaterResponse, movieResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/v1/theater/findTheatreDetailsByMovieId?movieId=${id}`),
          axios.get(`http://localhost:8080/api/v1/movie/getMovieById?movieId=${id}`)
        ]);
        setTheaters(theaterResponse.data);
        setFilteredTheaters(theaterResponse.data);
        setMovie(movieResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredTheaters(
      theaters.filter(theater =>
        theater.name.toLowerCase().includes(term) || theater.location.toLowerCase().includes(term)
      )
    );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log('Search Term:', searchTerm);
  };

  const handleBookingClick = (movieTitle, location, theaterName, screenName, startTime, imageUrl, seats) => {
    navigate('/seat', {
      state: {
        movieName: movieTitle,
        location: location,
        theaterName: theaterName,
        screenName: screenName,
        startTime: startTime,
        imageURL: imageUrl,
        seats: seats // Pass the seats array
      }
    });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid-container">
        <div className="grid-item item1">
          <header id='header'>
            <img id='title' src={Image1} alt="Title" />
            <form onSubmit={handleSearch}>
              <input
                className="mainLoginInput"
                placeholder='    &#61442;   Search Theaters'
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button type="submit" className="search-btn">Search</button>
              <Link to="/" id='to-home'>&#8606; HOME</Link>
            </form>
          </header>
        </div>
      </div>
      <div id='theater-content'>
        <img id='movie-img' src={movie.imageUrl} alt={movie.title} />
        <div id='movie-details'>
          <h1>{movie.title}</h1>
          <h5><span>&#x2606;</span> {movie.ratings}</h5>
          <h5>{movie.genre}</h5>
          <h5>{movie.duration} &#x26AC; {movie.date} </h5>
          <h5>{movie.language}</h5>
        </div>
        <div id='theater-dance'>
          <img id='gif-img' src={Image5} alt="Loading GIF" />
        </div>
      </div>
      <div id='theater-details'>
        {filteredTheaters.length > 0 ? (
          filteredTheaters.map(({ name, id, screens, location }) => (
            <div id='theater-booking' key={id}>
              <h3>{name} &gt; {location}
                {screens.map(screen => (
                  <span key={screen.id}>
                    {screen.showTimes.map(({ id, startTime, seats }) => (
                      <span key={id}>
                        <button
                          id='theater-booking-btn'
                          onClick={() => handleBookingClick(movie.title, location, name, screen.name, startTime, movie.imageUrl, seats)}
                        >
                          {startTime}
                        </button>
                        {seats.map(seat => (
                          <span key={seat.id}>
                            
                          </span>
                        ))}
                      </span>
                    ))}
                  </span>
                ))}
                <hr />
              </h3>
            </div>
          ))
        ) : (
          <img style={{ width: '300px', height: '250px', marginLeft: '36%' }} src={Image6} alt="No Response" />
        )}
      </div>
      <div className="grid-container">
        <div className="grid-item item5">
          <footer>
            <div className="footerPadamBooking-line">
              <img id='footer-padamBooking-img' src={Image1} alt="PadamBooking" />
            </div>
            <p className='copy-rights'>Copyright 2024 &#169; PadamBooking All Rights Reserved.</p>
            <div id="social-div">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img className='social-media' src={Image2} alt="Facebook" />
              </a>
              <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
                <img className='social-media' src={Image3} alt="Twitter" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img className='social-media' src={Image4} alt="Instagram" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Theaters;