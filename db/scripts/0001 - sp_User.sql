DELIMITER $$
CREATE OR REPLACE PROCEDURE UserCreate(OUT paramId INT, IN paramUniqID VARCHAR(128), IN paramEmail VARCHAR(255), IN paramPassword VARCHAR(255), IN paramRole VARCHAR(32))
BEGIN
    INSERT INTO 
		  User
	    (UniqID, Email, Password, Role)
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
END$$
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
END$$
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
CREATE OR REPLACE PROCEDURE UserUpdate()
BEGIN
  UPDATE
  User
  SET
    Kosarlabdazo.Nev=paramNev,
    Kosarlabdazo.Magassag=paramMagassag,
    Kosarlabdazo.Mezszam=paramMezszam
  WHERE
    Kosarlabdazo.ID=paramID;
    END$$
DELIMITER ;

/*DELIMITER $$
CREATE OR REPLACE PROCEDURE DiakDelete(IN paramId INT)
BEGIN
    DELETE FROM 
		  Diak
    WHERE 
		  Diak.Id = paramId;
END$$
DELIMITER ;*/