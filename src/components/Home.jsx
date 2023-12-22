import React, { useState, useEffect } from 'react';
import MyNavbar from './NavBar';
import './Home.css'; // Importa un file di stile CSS per applicare le modifiche

const Home = () => {
  const [gameOfThronesMovies, setGameOfThronesMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [numColumns, setNumColumns] = useState(5); // Numero di colonne predefinito
  const apiKey = '194f0009';

  useEffect(() => {
    const fetchMovies = async (url, setStateFunction) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === 'True') {
          setStateFunction(data.Search || []);
        } else {
          console.error('Error in API response:', data.Error);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies(`http://www.omdbapi.com/?s=game-of-thrones&type=series&apikey=${apiKey}`, setGameOfThronesMovies);

    fetchMovies(`http://www.omdbapi.com/?s=animation&type=movie&apikey=${apiKey}`, setAnimatedMovies);

    fetchMovies(`http://www.omdbapi.com/?s=random&type=movie&apikey=${apiKey}`, setRandomMovies);
  }, [apiKey]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setNumColumns(5);
      return;
    }

    const url = `http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        setSearchResults(data.Search || []);
        setNumColumns(10); // Imposta il numero di colonne per adattarsi ai risultati della ricerca
      } else {
        console.error('Error in API response:', data.Error);
        setSearchResults([]);
        setNumColumns(5); // Ripristina il numero predefinito di colonne
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setSearchResults([]);
      setNumColumns(5); // Ripristina il numero predefinito di colonne
    }
  };

  return (
    <div className="container-fluid px-4">
      <MyNavbar onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <div>
          <h4 className="text-white">Search Results</h4>
          <div className={`row row-cols-1 row-cols-md-${numColumns} mb-4 no-gutters text-center`}>
            {searchResults.map((movie) => (
              <div key={movie.imdbID} className={`col-md-${12 / numColumns} mb-2 px-1 movie-container`}>
                <img className="img-fluid movie-poster" src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && (
        <>
          <h4 className="text-white">Game of Thrones</h4>
          <div className="row row-cols-1 row-cols-md-5 text-center">
            {gameOfThronesMovies.map((movie) => (
              <div key={movie.imdbID} className="col-md-2 movie-container">
                <img className="img-fluid movie-poster" src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        </>
      )}

      {searchResults.length === 0 && (
        <>
          <h4 className="text-white">Animated Movies</h4>
          <div className="row row-cols-1 row-cols-md-5 mb-4 text-center">
            {animatedMovies.map((movie) => (
              <div key={movie.imdbID} className="col-md-2 movie-container">
                <img className="img-fluid movie-poster" src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        </>
      )}

      {searchResults.length === 0 && (
        <>
          <h4 className="text-white">Random Movies</h4>
          <div className="row row-cols-1 row-cols-md-5 ">
            {randomMovies.map((movie) => (
              <div key={movie.imdbID} className="col-md-2 movie-container">
                <img className="img-fluid movie-poster" src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
