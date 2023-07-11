-- Check if the database exists
SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'task_db';

-- If the database doesn't exist, create it
CREATE DATABASE IF NOT EXISTS task_db;