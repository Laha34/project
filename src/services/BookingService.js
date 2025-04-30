const STORAGE_KEY = 'bookings';

class BookingService {

  static getBookings() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return data;
  }

  static getBookingsByMovie(movieId) {
    const all = this.getBookings();
    const bookings = all[movieId] || [];
    return Array.isArray(bookings) ? bookings : [];
  }

  static getBookedSeats(movieId) {
    const bookings = this.getBookingsByMovie(movieId);
    return bookings.flatMap(booking => Array.isArray(booking.seats) ? booking.seats : []);
  }

  static saveBooking(movieId, seats, userData) {
    const all = this.getBookings();
    const movieBookings = this.getBookingsByMovie(movieId);
    movieBookings.push({ seats, userData });
    all[movieId] = movieBookings;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
}

export { BookingService };