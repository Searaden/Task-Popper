-- Check if the database exists
DROP DATABASE IF EXISTS task_db;

-- If the database doesn't exist, create it
CREATE DATABASE task_db;

USE task_db;

-- Create the user table
CREATE TABLE user (
    id CHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Create the task table with a foreign key to the user table
CREATE TABLE task (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    user_id CHAR(36),
    taskId CHAR(36),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE bounty (
  id CHAR(36) NOT NULL PRIMARY KEY,
  price INT NOT NULL,
  task_id CHAR(36),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE
);