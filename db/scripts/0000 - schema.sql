﻿DROP SCHEMA IF EXISTS `stikkerDB`;

CREATE SCHEMA IF NOT EXISTS `stikkerDB` DEFAULT CHARACTER SET utf8 ;

USE stikkerDB;

CREATE TABLE IF NOT EXISTS User
(
	Id INT8 AUTO_INCREMENT PRIMARY KEY,
	UniqID VARCHAR(128) NOT NULL UNIQUE,
	Email VARCHAR(255) NOT NULL,
	Password VARCHAR(255) NOT NULL,
	Role VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS Profile
(
	Id VARCHAR(255) PRIMARY KEY,
	Name VARCHAR(128) NOT NULL,
	BirthDate DATETIME NOT NULL
);



