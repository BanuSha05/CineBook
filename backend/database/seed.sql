USE cinebook;

INSERT INTO users (name, email) VALUES 
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

INSERT INTO movies (title, description, poster_url, duration, genre) VALUES 
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology.', 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 148, 'Sci-Fi'),
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 152, 'Action');

INSERT INTO theatres (name, location, city) VALUES 
('Cineplex Downtown', '123 Main St', 'Metropolis'),
('Starlight Cinemas', '456 Elm St', 'Gotham');

INSERT INTO shows (movie_id, theatre_id, show_time, ticket_price) VALUES 
(1, 1, DATE_ADD(NOW(), INTERVAL 1 DAY), 15.00),
(1, 2, DATE_ADD(NOW(), INTERVAL 1 DAY), 12.00),
(2, 1, DATE_ADD(NOW(), INTERVAL 2 DAY), 15.00);

-- Insert some dummy bookings
INSERT INTO bookings (user_id, show_id, seat_number) VALUES 
(1, 1, 'A1'),
(1, 1, 'A2'),
(2, 2, 'B3');
