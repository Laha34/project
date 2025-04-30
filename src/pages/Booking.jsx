import React from "react";
import { useParams } from "react-router-dom";
import CinemaHall from "../components/CinemaHall";

const Booking = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Booking</h1>
      <CinemaHall movieId={id} />
    </div>
  );
};

export default Booking;
