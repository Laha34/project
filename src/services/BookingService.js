const STORAGE_KEY = 'bookings';

class BookingService {
  // Отримати всі бро��ювання з localStorage
  static getBookings() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return data;
  }

  // Отримати бро��ювання для конкретного фільму
  static getBookingsByMovie(movieId) {
    const all = this.getBookings();
    const bookings = all[movieId] || [];
    return Array.isArray(bookings) ? bookings : [];
  }

  // Отримати заброньовані місця (масив рядків типу "1-5")
  static getBookedSeats(movieId) {
    const bookings = this.getBookingsByMovie(movieId);
    // bookings - масив об'єктів { seats: [...], userData }
    return bookings.flatMap(booking => Array.isArray(booking.seats) ? booking.seats : []);
  }

  // Зберегти нове бронювання
  static saveBooking(movieId, seats, userData) {
    const all = this.getBookings();
    const movieBookings = this.getBookingsByMovie(movieId);
    movieBookings.push({ seats, userData });
    all[movieId] = movieBookings;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

export { BookingService };