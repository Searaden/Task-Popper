-- Check if the database exists
DROP DATABASE IF EXISTS task_db;

-- If the database doesn't exist, create it
CREATE DATABASE task_db;

USE task_db;

-- creating table manually until sequelize table issue fixed
CREATE TABLE bounty (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    price INTEGER NOT NULL,
    task_id INTEGER NOT NULL
);