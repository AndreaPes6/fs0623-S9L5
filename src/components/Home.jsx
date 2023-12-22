import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://www.omdbapi.com/", {
          params: {
            i: "tt3896198",
            apikey: "194f0009",
          },
        });

        console.log("Risposta API:", response.data); // Aggiunto console.log

        setMovies(response.data.Search);
      } catch (error) {
        console.error("Errore durante la richiesta API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista dei film</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ margin: "10px" }}>
            <img
              src={movie.Poster}
              alt={movie.Title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <p>{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
