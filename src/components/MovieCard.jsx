import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-genre">{movie.genre}</p>
      <p className="movie-description">{movie.description}</p>
      <p className="movie-session">Час: {movie.sessionTime}</p>
      <Link to={`/booking/${movie.id}`} className="booking-button">
        Забронювати
      </Link>
    </div>
  );
};

export default MovieCard;
