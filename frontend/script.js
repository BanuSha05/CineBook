const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocalhost ? 'http://localhost:8000' : 'https://YOUR_PRODUCTION_BACKEND_URL.com';

document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        customer_name: document.getElementById('customer_name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        movie: document.getElementById('movie').value,
        booking_date: document.getElementById('booking_date').value,
        show_time: document.getElementById('show_time').value,
        members: parseInt(document.getElementById('members').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Booking failed. Check database connection.');
        }
        
        const result = await response.json();
        
        document.getElementById('res-id').textContent = result.booking_id;
        document.getElementById('res-name').textContent = result.customer_name;
        document.getElementById('res-movie').textContent = result.movie;
        document.getElementById('res-date').textContent = result.booking_date;
        document.getElementById('res-time').textContent = result.show_time;
        document.getElementById('res-members').textContent = result.members;
        document.getElementById('res-status').textContent = result.status;
        
        document.getElementById('booking-result').style.display = 'block';
        document.getElementById('booking-form').reset();
        
    } catch (err) {
        alert(err.message);
    }
});

document.getElementById('view-bookings-btn').addEventListener('click', async () => {
    document.getElementById('booking-section').style.display = 'none';
    document.getElementById('bookings-list-section').style.display = 'block';
    
    try {
        const response = await fetch(`${API_URL}/bookings`);
        if (!response.ok) {
            throw new Error('Failed to fetch bookings');
        }
        
        const bookings = await response.json();
        const tbody = document.querySelector('#bookings-table tbody');
        tbody.innerHTML = '';
        
        bookings.forEach(b => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${b.booking_id}</td>
                <td>${b.customer_name}</td>
                <td>${b.movie}</td>
                <td>${b.booking_date}</td>
                <td>${b.show_time}</td>
                <td>${b.members}</td>
                <td>${b.status}</td>
            `;
            tbody.appendChild(tr);
        });
        
    } catch (err) {
        alert(err.message);
    }
});

document.getElementById('back-to-booking-btn').addEventListener('click', () => {
    document.getElementById('bookings-list-section').style.display = 'none';
    document.getElementById('booking-section').style.display = 'block';
});
