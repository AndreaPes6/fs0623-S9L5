import React, { useState, useEffect } from "react";
import MyNavbar from "./NavBar";
import "./Home.css"; // Importa un file di stile CSS per applicare le modifiche

const Home = () => {
  const [gameOfThronesMovies, setGameOfThronesMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [numColumns, setNumColumns] = useState(6); // Numero di colonne predefinito
  const apiKey = "194f0009";

  useEffect(() => {
    const fetchMovies = async (url, setStateFunction) => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
          setStateFunction(data.Search || []);
        } else {
          console.error("Error in API response:", data.Error);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(
      `http://www.omdbapi.com/?s=star-wars&type=series&apikey=${apiKey}`,
      setGameOfThronesMovies
    );

    fetchMovies(
      `http://www.omdbapi.com/?s=animation&type=movie&apikey=${apiKey}`,
      setAnimatedMovies
    );

    fetchMovies(
      `http://www.omdbapi.com/?s=random&type=movie&apikey=${apiKey}`,
      setRandomMovies
    );
  }, [apiKey]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setNumColumns(5);
      return;
    }

    const url = `http://www.omdbapi.com/?s=${searchTerm}&type=movie&apikey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setSearchResults(data.Search || []);
        setNumColumns(10);
      } else {
        console.error("Error in API response:", data.Error);
        setSearchResults([]);
        setNumColumns(5);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchResults([]);
      setNumColumns(5);
    }
  };

  const handleGenreClick = (genre) => {
    // Implementa la logica per il click sul genere
    console.log(`Genre clicked: ${genre}`);
  };

  return (
    <div className="container-fluid px-4 text-white">
      <MyNavbar onSearch={handleSearch} />

      <div className="d-flex">
        <h2 className="mb-4">TV Shows</h2>
        <div className="dropdown ml-4 mt-1">
          <button
            className="btn btn-secondary btn-sm dropdown-toggle rounded-0 text-white dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{ backgroundColor: "#221f1f" }}
          >
            Genres &nbsp;
          </button>
          <div
            className="dropdown-menu bg-dark"
            aria-labelledby="dropdownMenuButton"
          >
            <a
              className="dropdown-item text-white bg-dark"
              href="#"
              onClick={() => handleGenreClick("Comedy")}
            >
              Comedy
            </a>
            <a
              className="dropdown-item text-white bg-dark"
              href="#"
              onClick={() => handleGenreClick("Drama")}
            >
              Drama
            </a>
            <a
              className="dropdown-item text-white bg-dark"
              href="#"
              onClick={() => handleGenreClick("Thriller")}
            >
              Thriller
            </a>
          </div>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h4 className="text-white">Search Results</h4>
          <div
            className={`row row-cols-1 row-cols-md-${numColumns} mb-4 no-gutters text-center justify-content-center`}
          >
            {searchResults.map((movie) => (
              <div
                key={movie.imdbID}
                className={`col-md-${
                  12 / numColumns
                } mb-2 px-1 movie-container`}
              >
                <img
                  className="img-fluid movie-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {searchResults.length === 0 && (
        <>
          <h4 className="text-white">Star Wars</h4>
          <div className="row row-cols-1 row-cols-md-5 text-center">
            {gameOfThronesMovies.map((movie) => (
              <div key={movie.imdbID} className="col-md-2 movie-container">
                <img
                  className="img-fluid movie-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
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
                <img
                  className="img-fluid movie-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
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
                <img
                  className="img-fluid movie-poster"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
