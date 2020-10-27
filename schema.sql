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
    PRIMARY KEY (ID)
);

INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES(1,'Elyes','Ferjani','elyes@rbk.com','123',1995,00000001,11111,'mazerati','ariana',2,'male',10);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES(2,'Kais','Temimi','kais@rbk.com','123',1995,00000002,11111,'ferrari','gammarth',5,'male',10);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES(4,'Othman','GUE','othman@rbk.com','123',1995,00000003,11111,'audi','ariana',3,'male',10);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES(5,'Ali','Smaoui','ali@rbk.com','123',1995,00000004,11111,'lamborghini','sokra',7,'male',10);
INSERT INTO drivers(id,firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES(6,'Skander','Khabou','skander@rbk.com','123',1995,00000005,11111,'bugatti','tunis',8,'male',10);
