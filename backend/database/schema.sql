CREATE DATABASE IF NOT EXISTS event_ticket_booking;
USE event_ticket_booking;

DROP TABLE IF EXISTS bookings;

CREATE TABLE IF NOT EXISTS bookings (
    booking_id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    movie VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    show_time VARCHAR(50) NOT NULL,
    members INT NOT NULL,
    status VARCHAR(50) DEFAULT 'CONFIRMED'
);
