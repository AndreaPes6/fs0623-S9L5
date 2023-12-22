import React, { useState, useEffect } from "react";
import MyNavbar from "./NavBar";
import "./Home.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [gameOfThronesMovies, setGameOfThronesMovies] = useState([]);
  const [animatedMovies, setAnimatedMovies] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [numColumns, setNumColumns] = useState(6);
  const [apiKey] = useState("194f0009");
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [reviewData, setReviewData] = useState({
    name: "",
    comment: "",
    rating: 1,
  });
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!selectedMovie || !selectedMovie.imdbID || !showModal) {
          return;
        }

        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${selectedMovie?.imdbID}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTUxNmI5ODkwODAwMTg0ODg3NjgiLCJpYXQiOjE3MDMyNTMyNzEsImV4cCI6MTcwNDQ2Mjg3MX0.4wpQLi-LI0cvUGxVGNN8j6hG_W64EEGvLJukGExTnJQ`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error("Error fetching reviews:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [selectedMovie, showModal]);

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
        setNumColumns(5);
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

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReviewData({ name: "", comment: "", rating: 1 });
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${selectedMovie?.imdbID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1OTUxNmI5ODkwODAwMTg0ODg3NjgiLCJpYXQiOjE3MDMyNTMyNzEsImV4cCI6MTcwNDQ2Mjg3MX0.4wpQLi-LI0cvUGxVGNN8j6hG_W64EEGvLJukGExTnJQ`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (response.ok) {
        console.log("Review submitted successfully");
        handleCloseModal();
      } else {
        console.error("Error submitting review:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container-fluid px-4 text-white">
      <MyNavbar onSearch={handleSearch} />

      <div className="d-flex">
        <h2 className="align-self-center">TV Shows</h2>
        <DropdownButton as={ButtonGroup} title="Genres" id="bg-vertical-dropdown-1" className="p-3" variant="secondary">
          <Dropdown.Item eventKey="1">horror</Dropdown.Item>
          <Dropdown.Item eventKey="2">Azione</Dropdown.Item>
          <Dropdown.Item eventKey="3">Romantici</Dropdown.Item>
          <Dropdown.Item eventKey="4">Animazione</Dropdown.Item>
          <Dropdown.Item eventKey="5">Adattamenti</Dropdown.Item>
        </DropdownButton>
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
                className={`col-md-${12 / numColumns} mb-2 px-1 movie-container`}
                onClick={() => handleOpenModal(movie)}
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
              <div
                key={movie.imdbID}
                className="col-md-2 movie-container"
                onClick={() => handleOpenModal(movie)}
              >
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
              <div
                key={movie.imdbID}
                className="col-md-2 movie-container"
                onClick={() => handleOpenModal(movie)}
              >
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
              <div
                key={movie.imdbID}
                className="col-md-2 movie-container"
                onClick={() => handleOpenModal(movie)}
              >
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review for {selectedMovie?.Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Il tuo nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="inserisci il tuo nome"
                value={reviewData.name}
                onChange={(e) =>
                  setReviewData({ ...reviewData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Commento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci il tuo commento "
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Votazioni</Form.Label>
              <Form.Control
                as="select"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    rating: parseInt(e.target.value),
                  })
                }
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>

          {reviews.length > 0 && showModal && (
            <div>
              <h5>Existing Reviews</h5>
              <ul>
                {reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}:</strong> {review.comment} (Rating:{" "}
                    {review.rating})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleReviewSubmit}>
            Lascia la tua recensione
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
