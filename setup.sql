DROP DATABASE IF EXISTS stattracker;
CREATE DATABASE stattracker;


\c stattracker

CREATE TABLE stats(
  id SERIAL PRIMARY KEY,
  eat TEXT,
  complete BOOLEAN,
  utensil TEXT,
  amount INTEGER,
  due_date DATE
);

INSERT INTO stats(eat,complete,utensil,amount,due_date) VALUES
('pizza', true,'spork', 7, '8/17/17'),
('tacos', false, 'spoon', 2, '12/24/17'),
('tostinos pizza wrapped in a taco', false, 'hands', 1, '12/24/17'),
('hamburger with a pizza inside of it', true, 'chopsticks', 4, '8/17/17'),
('turkey sandwich', true, 'straw', 2, '8/17/17'),
('pasta', false, 'toothpick', 3, '8/16/17'),
('pizza inside of another pizza inside of a taco with extra pizza', true,'chopsticks',5, '12/26/16');
