DROP SCHEMA IF EXISTS `stikkerDB`;

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
	BirthDate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Sticker
(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	Description TEXT NOT NULL,
	URL TEXT NOT NULL,
  Wanted VARCHAR(255) NOT NULL,
  Offered VARCHAR(255) NOT NULL,
  ProfileID VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Trade
(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	sellerID VARCHAR(255) NOT NULL,
	customerID VARCHAR(255) NOT NULL,
  stickerID INT NOT NULL,
  date DATE NOT NULL
);




DELIMITER $$
CREATE OR REPLACE PROCEDURE UserCreate(OUT paramId INT8, IN paramUniqID VARCHAR(128), IN paramEmail VARCHAR(255), IN paramPassword VARCHAR(255), IN paramRole VARCHAR(32))
BEGIN
    INSERT INTO 
		  User
	    (`UniqID`, `Email`, `Password`, `Role`)
    VALUES
		(paramUniqID, paramEmail, paramPassword, paramRole);
    SELECT LAST_INSERT_ID() as paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE UserFindByUniqID(IN paramUniqID VARCHAR(255))
BEGIN
    SELECT 
  		User.Id,
      User.UniqID,
      User.Email,
      User.Password,
      User.Role
    FROM
		  User
    WHERE 
		  User.UniqID = paramUniqID;
END $$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE UserFindByCredentials(IN paramEmail VARCHAR(255), IN paramPassword VARCHAR(255))
BEGIN
    SELECT 
  		User.Id,
      User.UniqID,
      User.Email,
      User.Password,
      User.Role
    FROM
		  User
    WHERE 
		  User.Email = paramEmail
      AND
      User.Password = paramPassword;
END $$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE UserFindByEmail(IN paramEmail VARCHAR(255))
BEGIN
    SELECT 
  		User.Id,
      User.UniqID,
      User.Email,
      User.Password,
      User.Role
    FROM
		  User
    WHERE 
		  User.Email = paramEmail;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE UserUpdate(IN paramId INT8,IN paramUniqID VARCHAR(128), IN paramEmail VARCHAR(255),IN paramPassword VARCHAR(255),IN paramRole VARCHAR(32))
BEGIN
Update
		User
	SET
  User.Id=paramId,
  User.UniqID=paramUniqID,
  User.Email=paramEmail,
  User.Password=paramPassword,
  User.Role=paramRole
  WHERE 
  User.Id=paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE UserDelete(IN paramId INT8)
BEGIN
    Delete
      FROM
      User
       WHERE 
		  User.Id = paramId;
END$$
DELIMITER ;


DELIMITER $$
CREATE OR REPLACE PROCEDURE ProfileCreate(IN paramId VARCHAR(255),IN paramName VARCHAR(128), IN paramBirthDate DATE)
BEGIN
INSERT INTO 
		  Profile
	    (`Id`, `Name`, `BirthDate`)
    VALUES
		(paramId, paramName, paramBirthDate);
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ProfileUpdate(IN paramId VARCHAR(255),IN paramName VARCHAR(128), IN paramBirthDate DATE)
BEGIN
Update
		  Profile
	   SET
    Profile.Id=paramId,
  Profile.Name=paramName,
  Profile.BirthDate=paramBirthDate
  WHERE 
  paramId=Profile.Id;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ProfileDelete(IN paramId VARCHAR(255))
BEGIN
    Delete
      FROM
      Profile
       WHERE 
		  Profile.Id = paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ProfileGetAll()
BEGIN
    SELECT
  Profile.Id,
      Profile.Name,
      Profile.BirthDate
      From Profile;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ProfileGetByID(IN paramId VARCHAR(255))
BEGIN
     SELECT
  Profile.Id,
      Profile.Name,
      Profile.BirthDate
      From Profile
  WHERE Profile.Id=paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ProfileFindByName(IN paramName VARCHAR(128))
BEGIN
     SELECT
  Profile.Id,
      Profile.Name,
      Profile.BirthDate
      From Profile
  WHERE Profile.Name=paramName;
END$$
DELIMITER ;


DELIMITER $$
CREATE OR REPLACE PROCEDURE StickerCreate(OUT paramId INT,IN paramDescription TEXT, IN paramURL TEXT,in paramWanted VARCHAR(255),IN paramOffered VARCHAR(255),in paramProfileID VARCHAR(255))
BEGIN
INSERT INTO 
		  Sticker
	    (`Description`, `URL`, `Wanted`, `Offered`, `ProfileID`)
    VALUES
		(paramDescription, paramURL, paramWanted,paramOffered,paramProfileID);
  SELECT LAST_INSERT_ID() AS paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE StickerUpdate(IN paramId INT,IN paramDescription TEXT, IN paramURL TEXT,in paramWanted VARCHAR(255),IN paramOffered VARCHAR(255),in paramProfileID VARCHAR(255))
BEGIN
Update
		  Sticker
	   SET
    Sticker.Description=paramDescription,
  Sticker.URL=paramURL,
  Sticker.Wanted=paramWanted,
  Sticker.Offered=paramOffered,
  Sticker.ProfileID=paramProfileID
  WHERE 
  paramId=Sticker.Id;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE StickerDelete(IN paramId INT)
BEGIN
    Delete
      FROM
      Sticker
       WHERE 
		  Sticker.Id = paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE StickerGetAll()
BEGIN
    SELECT
      Sticker.Id,
      Sticker.Description,
      Sticker.URL,
      Sticker.Wanted,
      Sticker.Offered,
      Sticker.ProfileID
      From Sticker;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE StickerGetByID(IN paramId INT)
BEGIN
     SELECT
      Sticker.Id,
      Sticker.Description,
      Sticker.URL,
      Sticker.Wanted,
      Sticker.Offered,
      Sticker.ProfileID
      From Sticker
  WHERE Sticker.Id=paramId;
END$$
DELIMITER ;



  DELIMITER $$
CREATE OR REPLACE PROCEDURE TradeCreate(OUT paramId INT,IN paramSellerID VARCHAR(255), IN paramCustomerID VARCHAR(255),in paramStickerID int,IN paramDate Date)
BEGIN
INSERT INTO 
		  Trades
	    (sellerID, `customerID`, `stickerID`, `date`)
    VALUES
		(paramSellerID, paramCustomerID, paramStickerID,paramDate);
  SELECT LAST_INSERT_ID() AS paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE TradeUpdate(IN paramId INT,IN paramSellerID VARCHAR(255), IN paramCustomerID VARCHAR(255),in paramStickerID int,IN paramDate Date)
BEGIN
Update
		  Trade
	   SET
    Trade.sellerID=paramSellerID,
  Trade.customerID=paramCustomerID,
  Trade.stickerID=paramStickerID,
  Trade.date=paramDate
  WHERE 
  paramId=Trade.Id;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE TradeDelete(IN paramId INT)
BEGIN
    Delete
      FROM
      Trade
       WHERE 
		  Trade.Id = paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE TradeGetAll()
BEGIN
    SELECT
      Trade.Id,
      Trade.sellerID,
      Trade.customerID,
      Trade.stickerID,
      Trade.date
      From Trade;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE TradeGetByID(IN paramId INT)
BEGIN
     SELECT
      Trade.Id,
      Trade.sellerID,
      Trade.customerID,
      Trade.stickerID,
      Trade.date
      From Trade
  WHERE Trade.Id=paramId;
END$$
DELIMITER ;
