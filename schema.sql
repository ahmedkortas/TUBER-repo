DROP DATABASE IF EXISTS tuber;

CREATE DATABASE tuber;

USE tuber;

/* DRIVERS TABLE FOR USER VIEW  */

CREATE TABLE drivers(
    id int NOT NULL AUTO_INCREMENT,
    firstName varchar(20) NOT NULL,
    lastName varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(20) NOT NULL,
    yearOfBirth decimal(10,2) NOT NULL,
    idCard decimal(10,2) NOT NULL, 
    driveLicense decimal(10,2) NOT NULL, 
    car varchar(20) NOT NULL,
    location varchar(20) NOT NULL,
    km decimal(5,2) NOT NULL,
    gender varchar(20) NOT NULL,
    rate decimal(10,2) NOT NULL,
    latt REAL,
    longi REAL, 
    PRIMARY KEY (ID)
);


CREATE TABLE history (
    id int NOT NULL AUTO_INCREMENT,
    available varchar(20) NOT NULL,
    driver_id int NOT NULL,
     PRIMARY KEY(ID),
     CONSTRAINT FK_driverID FOREIGN KEY (driver_id) References drivers(id)

);


CREATE TABLE requests(
    id int NOT NULL AUTO_INCREMENT,
    request varchar(20),
    x REAL ,
    y REAL ,
    picker_id int NOT NULL,
    PRIMARY KEY(ID),
    CONSTRAINT FK_pickerID FOREIGN KEY (picker_id) References drivers(id)
);


INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate,latt,longi) VALUES(1,'Elyes','Ferjani','elyes@rbk.com','490501512',1995,00000001,11111,'mazerati','ariana',2,'male',10,36.94592,10.1711872);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate,latt,longi) VALUES(2,'Kais','Temimi','kais@rbk.com','490501512',1995,00000002,11111,'ferrari','gammarth',5,'male',10,36.94592,10.1711872);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate,latt,longi) VALUES(3,'Othman','GUE','othman@rbk.com','490501512',1995,00000003,11111,'audi','ariana',3,'male',10,36.94592,10.1711872);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate,latt,longi) VALUES(4,'Ali','Smaoui','ali@rbk.com','490501512',1995,00000004,11111,'lamborghini','sokra',7,'male',10,36.94592,10.1711872);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate,latt,longi) VALUES(5,'Skander','Khabou','skander@rbk.com','490501512',1995,00000005,11111,'bugatti','tunis',8,'male',10,36.94592,10.1711872);


INSERT INTO history(id,available,driver_id) VALUES(1,'no',1);
INSERT INTO history(id,available,driver_id) VALUES(2,'no',2);
INSERT INTO history(id,available,driver_id) VALUES(3,'no',3);
INSERT INTO history(id,available,driver_id) VALUES(4,'no',4);
INSERT INTO history(id,available,driver_id) VALUES(5,'no',5);