import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        movie: 'Inception',
        time: '10:00 AM',
        date: '',
        members: 1
    });
    
    const [bookingDetails, setBookingDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // View Bookings State
    const [allBookings, setAllBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(false);
    const [fetchingBookings, setFetchingBookings] = useState(false);

    const movies = ['Inception', 'The Dark Knight', 'Interstellar', 'Dunkirk'];
    const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const res = await axios.post('http://localhost:5000/api/bookings', formData);
            setBookingDetails(res.data.booking);
        } catch (err) {
            const detailMsg = err.response?.data?.details;
            const errorMsg = err.response?.data?.error || 'Booking failed. Please try again.';
            setError(detailMsg ? `${errorMsg}: ${detailMsg}` : errorMsg);
        } finally {
            setLoading(false);
        }
    };
    
    const handleNewBooking = () => {
        setBookingDetails(null);
        setFormData({ ...formData, name: '', email: '', phone: '', date: '' });
    };

    const fetchBookings = async () => {
        setFetchingBookings(true);
        try {
            const res = await axios.get('http://localhost:5000/api/bookings');
            setAllBookings(res.data);
        } catch (err) {
            console.error('Failed to fetch bookings', err);
        } finally {
            setFetchingBookings(false);
        }
    };

    const toggleBookings = () => {
        if (!showBookings) {
            fetchBookings();
        }
        setShowBookings(!showBookings);
    };

    return (
        <div style={{ width: '100%', maxWidth: '900px' }}>
            <div className="container" style={{ margin: '0 auto' }}>
            <h1>CineBook Ticket Booking</h1>
            
            {bookingDetails ? (
                <div className="confirmation-card">
                    <h2>✅ Booking Confirmed!</h2>
                    <p><strong>Booking ID:</strong> {bookingDetails.id}</p>
                    <p><strong>Name:</strong> {bookingDetails.name}</p>
                    <p><strong>Movie:</strong> {bookingDetails.movie}</p>
                    <p><strong>Date:</strong> {bookingDetails.date}</p>
                    <p><strong>Show Time:</strong> {bookingDetails.time}</p>
                    <p><strong>Members:</strong> {bookingDetails.members}</p>
                    <p><strong>Status:</strong> {bookingDetails.status}</p>
                    <button onClick={handleNewBooking} className="btn" style={{marginTop: '20px'}}>Book Another Ticket</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Customer Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Select Movie *</label>
                        <select name="movie" value={formData.movie} onChange={handleChange} required>
                            {movies.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Select Date *</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Select Time *</label>
                        <select name="time" value={formData.time} onChange={handleChange} required>
                            {times.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Number of Members *</label>
                        <select name="members" value={formData.members} onChange={handleChange} required>
                            {[...Array(10)].map((_, i) => (
                                <option key={i+1} value={i+1}>{i+1}</option>
                            ))}
                        </select>
                    </div>
                    
                    {error && <p className="error">{error}</p>}
                    
                    <button type="submit" disabled={loading} className="btn">
                        {loading ? 'Processing...' : 'Book Ticket'}
                    </button>
                </form>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                    onClick={toggleBookings} 
                    className="btn" 
                    style={{ background: '#555', maxWidth: '300px' }}
                >
                    {showBookings ? 'Hide Bookings' : 'View Bookings'}
                </button>
            </div>
            </div>

            {showBookings && (
                <div className="bookings-section">
                    <h2>Recent Bookings</h2>
                    <div style={{ textAlign: 'right' }}>
                        <button onClick={fetchBookings} className="btn" style={{ width: 'auto', padding: '8px 15px', fontSize: '0.9rem' }} disabled={fetchingBookings}>
                            {fetchingBookings ? 'Refreshing...' : 'Refresh Bookings'}
                        </button>
                    </div>
                    
                    {allBookings.length === 0 && !fetchingBookings ? (
                        <p style={{ textAlign: 'center', marginTop: '20px' }}>No bookings found.</p>
                    ) : (
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Movie</th>
                                        <th>Show Time</th>
                                        <th>Date</th>
                                        <th>Members</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allBookings.map(b => (
                                        <tr key={b.id}>
                                            <td>{b.id}</td>
                                            <td>{b.customer_name}</td>
                                            <td>{b.email}</td>
                                            <td>{b.movie_name}</td>
                                            <td>{b.show_time}</td>
                                            <td>{new Date(b.booking_date).toLocaleDateString()}</td>
                                            <td>{b.num_members}</td>
                                            <td style={{ color: '#4CAF50', fontWeight: 'bold' }}>{b.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
