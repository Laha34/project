import React from "react";
import { movies } from "../data/movies";
import MovieList from "../components/MovieList";

const Home = () => {
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
