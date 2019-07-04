DROP DATABASE IF EXISTS friendsift_db;

CREATE DATABASE friendsift_db;

USE friendsift_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NULL,
  gender VARCHAR(10) NULL,
  coolpoints INT NULL,
  PRIMARY KEY (id)
);


