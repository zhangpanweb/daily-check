create database daily_check_db;

CREATE USER 'daily_check'@'localhost' IDENTIFIED BY 'daily_check';

GRANT ALL ON daily_check_db.* TO 'daily_check'@'localhost';

ALTER USER 'daily_check'@'localhost' IDENTIFIED WITH mysql_native_password BY 'daily_check';