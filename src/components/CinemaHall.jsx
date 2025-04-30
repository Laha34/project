import React, { useState, useEffect } from "react";
import "./CinemaHall.css"; 
import { BookingService } from "../services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CinemaHall = ({ movieId }) => {
  const rows = 5;
  const seatsPerRow = 8;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    const seats = BookingService.getBookedSeats(movieId);
    setBookedSeats(Array.isArray(seats) ? seats : []);
  }, [movieId]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
    );
  };

  const handleBookingClick = () => {
    if (selectedSeats.length === 0) {
      toast.error("Будь ласка, оберіть принаймні одне місце!");
      return;
    }
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, phone, email } = userData;
    if (!name || !phone || !email) {
      toast.error("Будь ласка, заповніть всі поля!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Неправильний формат Email!");
      return false;
    }
    return true;
  };

  const handleConfirmBooking = () => {
    if (!validateForm()) return;

    BookingService.saveBooking(movieId, selectedSeats, userData);
    toast.success("Бронювання успішне!");

    setSelectedSeats([]);
    setUserData({ name: "", phone: "", email: "" });
    setShowForm(false);

    const updated = BookingService.getBookedSeats(movieId);
    setBookedSeats(Array.isArray(updated) ? updated : bookedSeats);
  };

  const renderSeats = () => {
    const elements = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        elements.push(
          <div
            key={seatId}
            className={`seat ${bookedSeats.includes(seatId) ? "booked" : ""} ${selectedSeats.includes(seatId) ? "selected" : ""}`}
            onClick={() => handleSeatClick(seatId)}
          >
            {seat}
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className="cinema-hall">
      <h2>Оберіть місця</h2>
      <div className="seats-grid">{renderSeats()}</div>
      {!showForm && (
        <button onClick={handleBookingClick} className="confirm-button">
          Забронювати
        </button>
      )}
      {showForm && (
        <div className="booking-form">
          <input
            type="text"
            placeholder="Ім'я"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Телефон"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <button onClick={handleConfirmBooking} className="confirm-button">
            Підтвердити
          </button>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;
