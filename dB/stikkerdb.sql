-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Már 25. 15:59
-- Kiszolgáló verziója: 10.4.11-MariaDB
-- PHP verzió: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `stikkerdb`
--
CREATE DATABASE IF NOT EXISTS `stikkerdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `stikkerdb`;

DELIMITER $$
--
-- Eljárások
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemCreate` (IN `paramId` INT, IN `paramStickerId` INT, IN `paramPurchaseId` INT)  BEGIN
INSERT INTO 
		  Item
	    (`Id`, `StickerId`, `PurchaseId`)
    VALUES
		(paramId, paramStickerId, paramPurchaseId);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemDelete` (IN `paramId` INT)  BEGIN
    Delete
      FROM
      Item
       WHERE 
		  Item.Id = paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemGetAll` ()  BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemGetByID` (IN `paramId` INT)  BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `ItemUpdate` (IN `paramId` INT, IN `paramStickerId` INT, IN `paramPurchaseId` INT)  BEGIN
Update
		  Item
	   SET
    Item.Id=paramId,
  Item.StickerId=paramStickerId,
  Item.PurchaseId=paramPurchaseId
  WHERE 
  paramId=Item.Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProfileCreate` (IN `paramId` VARCHAR(255), IN `paramName` VARCHAR(128), IN `paramBirthDate` DATE)  BEGIN
INSERT INTO 
		  Profile
	    (`Id`, `Name`, `BirthDate`)
    VALUES
		(paramId, paramName, paramBirthDate);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProfileDelete` (IN `paramId` VARCHAR(255))  BEGIN
    Delete
      FROM
      Profile
       WHERE 
		  Profile.Id = paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProfileFindByName` (IN `paramName` VARCHAR(128))  BEGIN
     SELECT
      Profile.Id,
      Profile.Name,
      Profile.BirthDate
      From Profile
  WHERE Profile.Name=paramName;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProfileGetAll` ()  BEGIN
    SELECT
  Profile.Id,
      Profile.Name,
      Profile.BirthDate
      From Profile;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProfileGetByID` (IN `paramId` VARCHAR(255))  BEGIN
     SELECT
  Profile.Id,
      Profile.Name,
      Profile.BirthDate
      From Profile
  WHERE Profile.Id=paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ProfileUpdate` (IN `paramId` VARCHAR(255), IN `paramName` VARCHAR(128), IN `paramBirthDate` DATE)  BEGIN
Update
		  Profile
	   SET
    Profile.Id=paramId,
  Profile.Name=paramName,
  Profile.BirthDate=paramBirthDate
  WHERE 
  paramId=Profile.Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PurchaseCreate` (OUT `paramId` INT, IN `paramCustomerID` VARCHAR(255), IN `paramPurchaseDate` DATE)  BEGIN
INSERT INTO 
		  Purchase
	    (`CustomerID`, `PurchaseDate`)
    VALUES
		(paramCustomerID, paramPurchaseDate);
SELECT LAST_INSERT_ID() AS paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PurchaseGetAll` ()  BEGIN
    SELECT
      Purchase.Id,
      Purchase.CustomerID,
      Purchase.PurchaseDate
      From Purchase;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PurchaseGetByID` (IN `paramId` INT)  BEGIN
     SELECT
      Purchase.Id,
      Purchase.CustomerID,
      Purchase.PurchaseDate
      From Purchase
  WHERE Purchase.Id=paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StickerCreate` (OUT `paramId` INT, IN `paramDescription` TEXT, IN `paramURL` TEXT, IN `paramPrice` INT)  BEGIN
INSERT INTO 
		  Sticker
	    (`Description`, `URL`,`Price`)
    VALUES
		(paramDescription, paramURL, paramPrice);
  SELECT LAST_INSERT_ID() AS paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StickerDelete` (IN `paramId` INT)  BEGIN
    Delete
      FROM
      Sticker
       WHERE 
		  Sticker.Id = paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StickerGetAll` ()  BEGIN
    SELECT
      Sticker.Id,
      Sticker.Description,
      Sticker.URL,
      Sticker.Price
      From Sticker;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StickerGetByID` (IN `paramId` INT)  BEGIN
     SELECT
      Sticker.Id,
      Sticker.Description,
      Sticker.URL,
      Sticker.Price
      From Sticker
  WHERE Sticker.Id=paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `StickerUpdate` (IN `paramId` INT, IN `paramDescription` TEXT, IN `paramURL` TEXT, IN `paramPrice` INT)  BEGIN
Update
	Sticker
	SET
  Sticker.Description=paramDescription,
  Sticker.URL=paramURL,
  Sticker.Price=paramPrice
  WHERE 
  paramId=Sticker.Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserCreate` (OUT `paramId` INT8, IN `paramUniqID` VARCHAR(128), IN `paramEmail` VARCHAR(255), IN `paramPassword` VARCHAR(255), IN `paramRole` VARCHAR(32))  BEGIN
    INSERT INTO 
		  User
	    (`UniqID`, `Email`, `Password`, `Role`)
    VALUES
		(paramUniqID, paramEmail, paramPassword, paramRole);
    SELECT LAST_INSERT_ID() as paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserDelete` (IN `paramId` INT8)  BEGIN
    Delete
      FROM
      User
       WHERE 
		  User.Id = paramId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserFindByCredentials` (IN `paramEmail` VARCHAR(255), IN `paramPassword` VARCHAR(255))  BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserFindByEmail` (IN `paramEmail` VARCHAR(255))  BEGIN
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserFindByUniqID` (IN `paramUniqID` VARCHAR(255))  BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UserUpdate` (IN `paramId` INT, IN `paramPassword` VARCHAR(255))  BEGIN
Update
		User
	SET
  User.Password=paramPassword
  WHERE 
  User.Id=paramId;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `item`
--

CREATE TABLE `item` (
  `Id` int(11) NOT NULL,
  `StickerId` int(11) NOT NULL,
  `PurchaseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `item`
--

INSERT INTO `item` (`Id`, `StickerId`, `PurchaseId`) VALUES
(39, 5, 16),
(40, 5, 16),
(41, 6, 17),
(42, 6, 17);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `profile`
--

CREATE TABLE `profile` (
  `Id` varchar(255) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `BirthDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `profile`
--

INSERT INTO `profile` (`Id`, `Name`, `BirthDate`) VALUES
('26172bbe-2d91-4ad3-8b8d-0dc9fac0b0a0', 'Proba Proba', '2002-03-24'),
('61d93852-427f-4b0e-a0c5-8529d7017ef0', 'Test Test', '2000-07-23'),
('7432fe08-fe9c-4bea-bc5c-b8e0141433d9', 'Balogh Zsolt', '2000-09-20');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `purchase`
--

CREATE TABLE `purchase` (
  `Id` int(11) NOT NULL,
  `CustomerID` varchar(255) NOT NULL,
  `PurchaseDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `purchase`
--

INSERT INTO `purchase` (`Id`, `CustomerID`, `PurchaseDate`) VALUES
(16, '7432fe08-fe9c-4bea-bc5c-b8e0141433d9', '2020-03-25'),
(17, '7432fe08-fe9c-4bea-bc5c-b8e0141433d9', '2020-03-25');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sticker`
--

CREATE TABLE `sticker` (
  `Id` int(11) NOT NULL,
  `Description` text NOT NULL,
  `URL` text NOT NULL,
  `Price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `sticker`
--

INSERT INTO `sticker` (`Id`, `Description`, `URL`, `Price`) VALUES
(1, 'Magic Johnson', 'https://ih1.redbubble.net/image.483880311.3691/st,small,507x507-pad,600x600,f8f8f8.u8.jpg', 389),
(2, 'Gregg Popovich', 'https://ih0.redbubble.net/image.204177799.9343/st,small,507x507-pad,600x600,f8f8f8.u3.jpg', 529),
(3, 'Michael Jordan sírós matrica', 'https://ih1.redbubble.net/image.239760373.7193/st,small,507x507-pad,600x600,f8f8f8.u2.jpg', 499),
(4, 'Kobe, Michael, Lebron együtt', 'https://ih1.redbubble.net/image.1071599976.6722/st,small,507x507-pad,600x600,f8f8f8.u1.jpg', 749),
(5, 'Kobe 8/24', 'https://ih1.redbubble.net/image.1062103816.3479/st,small,507x507-pad,600x600,f8f8f8.jpg', 599),
(6, 'Lebron James- KING', 'https://ih1.redbubble.net/image.411471429.2632/st,small,507x507-pad,600x600,f8f8f8.u3.jpg', 599),
(7, 'Giannis Antetokounmpo', 'https://ih1.redbubble.net/image.455040604.0028/st,small,507x507-pad,600x600,f8f8f8.u1.jpg', 499),
(8, 'Kobe és Gigi', 'https://ih1.redbubble.net/image.1064023887.0787/st,small,507x507-pad,600x600,f8f8f8.u2.jpg', 899),
(9, 'Air Jordan', 'https://ih0.redbubble.net/image.735809414.0094/st,small,507x507-pad,600x600,f8f8f8.u4.jpg', 399),
(10, 'Steph Curry', 'https://ih0.redbubble.net/image.463512203.5648/st,small,507x507-pad,600x600,f8f8f8.u1.jpg', 369),
(11, 'Shaquille O\'Neal', 'https://ih0.redbubble.net/image.310775182.2070/st,small,507x507-pad,600x600,f8f8f8.u3.jpg', 379),
(12, 'Lebron James', 'https://ih1.redbubble.net/image.661681126.6482/st,small,507x507-pad,600x600,f8f8f8.u5.jpg', 599),
(13, 'Tim Duncan', 'https://ih0.redbubble.net/image.477217135.7368/st,small,507x507-pad,600x600,f8f8f8.u1.jpg', 499),
(14, 'Kobe Bryant', 'https://ih1.redbubble.net/image.1072246747.2231/st,small,507x507-pad,600x600,f8f8f8.jpg', 599),
(15, 'Luka Doncic', 'https://ih1.redbubble.net/image.741163746.4172/st,small,507x507-pad,600x600,f8f8f8.jpg', 599),
(16, 'Trae Young', 'https://ih1.redbubble.net/image.849785809.3558/st,small,507x507-pad,600x600,f8f8f8.u3.jpg', 569),
(17, 'Wilt Chamberlain 100 pontja', 'https://ih1.redbubble.net/image.371038303.0193/st,small,507x507-pad,600x600,f8f8f8.u10.jpg', 429),
(18, 'Larry Bird', 'https://ih0.redbubble.net/image.483877784.3618/st,small,507x507-pad,600x600,f8f8f8.u8.jpg', 489);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `Id` bigint(20) NOT NULL,
  `UniqID` varchar(128) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`Id`, `UniqID`, `Email`, `Password`, `Role`) VALUES
(1, '7432fe08-fe9c-4bea-bc5c-b8e0141433d9', 'admin@gmail.com', 'YWRtaW4=', 'ROLE_ADMIN'),
(2, '61d93852-427f-4b0e-a0c5-8529d7017ef0', 'test@test.test', 'dGVzdA==', 'ROLE_CLIENT'),
(24, '26172bbe-2d91-4ad3-8b8d-0dc9fac0b0a0', 'proba@proba.hu', 'amVsc3pv', 'ROLE_CLIENT');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `sticker`
--
ALTER TABLE `sticker`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UniqID` (`UniqID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `item`
--
ALTER TABLE `item`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT a táblához `purchase`
--
ALTER TABLE `purchase`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `sticker`
--
ALTER TABLE `sticker`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
