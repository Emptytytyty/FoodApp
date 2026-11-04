CREATE DATABASE IF NOT EXISTS food_app;
\c food_app;
CREATE TABLE users (
  id uuid PRIMARY KEY,
  email varchar(100) NOT NULL UNIQUE,
  name varchar(100) NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE user_goals (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  proteins decimal(7, 2) NOT NULL default 0 
    CHECK (proteins >= 0),
  carbs decimal(7, 2) NOT NULL default 0 
    CHECK (carbs >= 0),
  fats decimal(7, 2) NOT NULL default 0 
    CHECK (fats >= 0)
);

CREATE TABLE daily_food_logs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  log_date date NOT NULL,
  CONSTRAINT unique_user_log_date UNIQUE (user_id, log_date)
);

CREATE TABLE daily_food_log_items (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  log_id bigint NOT NULL REFERENCES daily_food_logs(id) ON DELETE CASCADE,
  name varchar(100) NOT NULL default 'Вкусность',
  proteins decimal(7, 2) NOT NULL default 0
    CHECK (proteins >= 0),
  carbs decimal(7, 2) NOT NULL default 0
    CHECK (carbs >= 0),
  fats decimal(7, 2) NOT NULL default 0
    CHECK (fats >= 0),
  weight int NOT NULL CHECK (weight > 0),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

password - 2OG5UNOr2sfsWUYq