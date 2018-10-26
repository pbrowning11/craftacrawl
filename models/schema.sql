DROP DATABASE IF EXISTS CraftACrawldb;

CREATE DATABASE CraftACrawldb;

USE CraftACrawldb;

CREATE TABLE crawls (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    street VARCHAR(45) NULL,
    zip INT(5) NULL,
    cat1 VARCHAR(30) NULL,
    cat2 VARCHAR(30) NULL,
    website VARCHAR(100) NULL,
    phone INT(10) NULL,
    PRIMARY KEY (id)
);