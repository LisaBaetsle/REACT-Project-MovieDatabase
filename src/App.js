import React, { useState, useEffect } from 'react';
import Movie from './components/Movie';

const FEATURED_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getMovies = (API) => {
    fetch(API)
    .then(response => response.json())
    .then(data => {
      setMovies(data.results);
    });
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []); 
  
  const handleOnSubmit = (event) => {
    event.preventDefault();

    getMovies(SEARCH_API + searchTerm);

    setSearchTerm('');
    };
 

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
    <header>
      <p>MOVIE DATABASE</p>
      <form onSubmit={handleOnSubmit}>
        <input 
          type="search" 
          placeholder="Search..." 
          className="search" 
          value={searchTerm}
          onChange={handleOnChange} />
      </form>
    </header>
    <div className="movie-container">
      {movies.length > 0 && movies.map((movie => 
      <Movie key={movie.id} {...movie} /> // ...movies makes sure we get all the props seperatly
      ))}
    </div>
    </>
  );
};

export default App;
