USE adore_salon;

-- Password: "user"
INSERT INTO users (username, password) VALUES
('user', '$2a$10$amHsiYATHUeE4xgdGPi0e.pKKplr16K6DB06.8GxLa/fouzbf7zsu')
ON DUPLICATE KEY UPDATE username=username;

INSERT INTO reservations (client_name, client_phone, client_email, service, appointment_date, appointment_time, duration_hours, status, notes) VALUES

('Ivana Stanković', '+387 65 444 555', 'ivana.stankovic@email.com', 'Pramenovi', DATE_ADD(CURDATE(), INTERVAL (1 - WEEKDAY(CURDATE())) DAY), '10:00:00', 1, 'confirmed', NULL),
('Marko Petrović', '+387 65 555 666', 'marko.petrovic@email.com', 'Pramenovi', DATE_ADD(CURDATE(), INTERVAL (1 - WEEKDAY(CURDATE())) DAY), '14:00:00', 1, 'confirmed', 'Herbanne tražna nebosa'),

('Marina Petrović', '+387 65 050 205', 'marina.petrovic@email.com', 'Slonić', DATE_ADD(CURDATE(), INTERVAL (2 - WEEKDAY(CURDATE())) DAY), '09:00:00', 6, 'confirmed', 'Zahtjev u madrici ig:00'),

('Ana Jovanović', '+387 65 434 555', 'ana.jovanovic@email.com', 'Šišanje', DATE_ADD(CURDATE(), INTERVAL (3 - WEEKDAY(CURDATE())) DAY), '10:00:00', 1, 'confirmed', NULL),
('Milica Đorđević', '+387 93 001 00 00', 'milica.djordjevic@email.com', 'Farbanne + Fen frizura', DATE_ADD(CURDATE(), INTERVAL (3 - WEEKDAY(CURDATE())) DAY), '14:00:00', 2, 'cancelled', 'Herbanne trazna nebosa'),

('Marina Petrović', '+387 65 050 205', 'marina.petrovic@email.com', 'Balayage', DATE_ADD(CURDATE(), INTERVAL (4 - WEEKDAY(CURDATE())) DAY), '12:00:00', 2, 'confirmed', 'Zahtjev u madrici ig:00'),
('Marija Petrović', '+387 66 001 100', 'marija.petrovic@email.com', 'Keratinski tretman', DATE_ADD(CURDATE(), INTERVAL (4 - WEEKDAY(CURDATE())) DAY), '15:00:00', 3, 'confirmed', NULL),

('Marko Petrović', '+387 65 444 555', NULL, 'Šišanje', DATE_ADD(CURDATE(), INTERVAL (5 - WEEKDAY(CURDATE())) DAY), '15:00:00', 1, 'cancelled', 'Klijent otkazao'),

('Lazar Simić', '+387 97 001 10 100', 'lazar.simic@email.com', 'Šišanje + Styling', DATE_ADD(CURDATE(), INTERVAL (6 - WEEKDAY(CURDATE())) DAY), '17:00:00', 1, 'confirmed', NULL),

('Jovana Milanović', '+387 62 111 222', 'jovana.milanovic@email.com', 'Farbanje', DATE_ADD(CURDATE(), INTERVAL (8 - WEEKDAY(CURDATE())) DAY), '11:00:00', 2, 'pending', NULL),
('Aleksandra Marković', '+387 61 111 222', 'aleksandra.markovic@email.com', 'Balayage', DATE_ADD(CURDATE(), INTERVAL (9 - WEEKDAY(CURDATE())) DAY), '09:00:00', 3, 'pending', 'Dolazim prvi put'),
('Sara Todorović', '+387 64 456 789', 'sara.todorovic@email.com', 'Svečana frizura', DATE_ADD(CURDATE(), INTERVAL (10 - WEEKDAY(CURDATE())) DAY), '13:00:00', 2, 'confirmed', 'Za svadbu'),

('Tijana Stanić', '+387 64 333 444', 'tijana.stanic@email.com', 'Pramenovi', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '10:00:00', 1, 'completed', NULL),
('Stefan Nikolić', '+387 67 666 777', 'stefan.nikolic@email.com', 'Muško šišanje', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '14:30:00', 1, 'completed', NULL),
('Dragana Savić', '+387 66 555 666', 'dragana.savic@email.com', 'Balayage', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '09:30:00', 3, 'completed', NULL);

INSERT INTO contact_messages (name, email, phone, message, is_read) VALUES
('Aleksandra Marković', 'aleksandra.markovic@email.com', '+387 61 111 222', 'Pozdrav, zanima me da li radite vikendom? Htjela bih zakazati termin za subotu.', false),
('Jovana Simić', 'jovana.simic@email.com', '+387 62 222 333', 'Molim vas da mi pošaljete cjenovnik za sve usluge. Hvala!', true),
('Stefan Ilić', 'stefan.ilic@email.com', '+387 63 333 444', 'Da li radite muške frizure? Ako da, koliko košta obično šišanje?', false),
('Dragana Kostić', 'dragana.kostic@email.com', '+387 64 444 555', 'Zanima me da li nudite konsultacije za boju kose prije farbanja? Nikad nisam farbala kosu i trebala bi savet.', false),
('Nemanja Jović', 'nemanja.jovic@email.com', '+387 65 555 666', 'Hvala vam na sjajnoj usluzi prošli put! Želim ponovo zakazati termin.', true),
('Maja Popović', 'maja.popovic@email.com', '+387 66 666 777', 'Da li mogu kupiti Kérastase proizvode kod vas bez zakazivanja termina?', true),
('Filip Radović', 'filip.radovic@email.com', '+387 67 777 888', 'Interesuje me da li radite keratin tretmane i koliko traje taj proces?', false);
