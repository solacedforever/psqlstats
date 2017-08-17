DROP DATABASE IF EXISTS stattracker;
CREATE DATABASE stattracker;


\c stattracker

CREATE TABLE stats(
  id SERIAL PRIMARY KEY,
  eat TEXT,
  complete BOOLEAN,
  due_date DATE
);

INSERT INTO stats(eat,complete,due_date) VALUES
('pizza', true, '8/17/17'),
('tacos', false, '12/24/17'),
('tostinos pizza wrapped in a taco', false, '12/24/17'),
('hamburger with a pizza inside of it', true, '8/17/17'),
('turkey sandwich', true, '8/17/17'),
('pasta', false, '8/16/17'),
('pizza inside of another pizza inside of a taco with extra pizza', true, '12/26/16');
