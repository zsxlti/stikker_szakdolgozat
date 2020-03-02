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
  Price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Purchase
(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	customerID VARCHAR(255) NOT NULL,
  stickerID INT NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS Item
(
	Id INT AUTO_INCREMENT PRIMARY KEY,
	StickerId INT NOT NULL,
  PurchaseId INT NOT NULL
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
CREATE OR REPLACE PROCEDURE StickerCreate(OUT paramId INT,IN paramDescription TEXT, IN paramURL TEXT,in paramPrice INT)
BEGIN
INSERT INTO 
		  Sticker
	    (`Description`, `URL`,`Price`)
    VALUES
		(paramDescription, paramURL, paramPrice);
  SELECT LAST_INSERT_ID() AS paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE StickerUpdate(IN paramId INT,IN paramDescription TEXT, IN paramURL TEXT,in paramPrice INT)
BEGIN
Update
		  Sticker
	   SET
  Sticker.Description=paramDescription,
  Sticker.URL=paramURL,
  Sticker.Price=paramPrice
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
      Sticker.Price
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
      Sticker.Price
      From Sticker
  WHERE Sticker.Id=paramId;
END$$
DELIMITER ;



  DELIMITER $$
CREATE OR REPLACE PROCEDURE PurchaseCreate(OUT paramId INT, IN paramCustomerID VARCHAR(255),in paramStickerID int,IN paramDate Date)
BEGIN
INSERT INTO 
		  Purchase
	    (`customerID`, `stickerID`, `date`)
    VALUES
		(paramCustomerID, paramStickerID,paramDate);
SELECT LAST_INSERT_ID() AS paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE PurchaseUpdate(IN paramId INT, IN paramCustomerID VARCHAR(255),in paramStickerID int,IN paramDate Date)
BEGIN
Update
		  Purchase
	   SET
  Purchase.customerID=paramCustomerID,
  Purchase.stickerID=paramStickerID,
  Purchase.date=paramDate
  WHERE 
  paramId=Purchase.Id;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE PurchaseDelete(IN paramId INT)
BEGIN
    Delete
      FROM
      Purchase
       WHERE 
		  Purchase.Id = paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE PurchaseGetAll()
BEGIN
    SELECT
      Purchase.Id,
      Purchase.customerID,
      Purchase.stickerID,
      Purchase.date
      From Purchase;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE PurchaseGetByID(IN paramId INT)
BEGIN
     SELECT
      Purchase.Id,
      Purchase.customerID,
      Purchase.stickerID,
      Purchase.date
      From Purchase
  WHERE Purchase.Id=paramId;
END$$
DELIMITER ;


DELIMITER $$
CREATE OR REPLACE PROCEDURE ItemCreate(IN paramId INT,IN paramStickerId INT, IN paramPurchaseId INT)
BEGIN
INSERT INTO 
		  Item
	    (`Id`, `StickerId`, `PurchaseId`)
    VALUES
		(paramId, paramStickerId, paramPurchaseId);
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ItemUpdate(IN paramId INT,IN paramStickerId INT, IN paramPurchaseId INT)
BEGIN
Update
		  Item
	   SET
    Item.Id=paramId,
  Item.StickerId=paramStickerId,
  Item.PurchaseId=paramPurchaseId
  WHERE 
  paramId=Item.Id;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ItemDelete(IN paramId INT)
BEGIN
    Delete
      FROM
      Item
       WHERE 
		  Item.Id = paramId;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ItemGetAll()
BEGIN
    SELECT
      Item.Id,
      Item.StickerId,
      Item.PurchaseId,
      Sticker.URL,
      Sticker.Description,
      Sticker.Price,
      Purchase.customerID,
      Purchase.date
      From Item
  INNER JOIN Sticker on item.StickerId=Sticker.Id
  INNER JOIN Purchase on item.PurchaseId=Purchase.Id;
END$$
DELIMITER ;

DELIMITER $$
CREATE OR REPLACE PROCEDURE ItemGetByID(IN paramId INT)
BEGIN
     SELECT
      Item.Id,
      Item.StickerId,
      Item.PurchaseId,
      Sticker.URL,
      Sticker.Description,
      Sticker.Price,
      Purchase.customerID,
      Purchase.date
      From Item
  INNER JOIN Sticker on item.StickerId=Sticker.Id
  INNER JOIN Purchase on item.PurchaseId=Purchase.Id
  WHERE Item.Id=paramId;
END$$
DELIMITER ;