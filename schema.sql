DROP DATABASE IF EXISTS tuber;
CREATE DATABASE tuber;
USE tuber;


CREATE TABLE drivers (
      id            int NOT NULL AUTO_INCREMENT,
      firstName       VARCHAR(50) NOT NULL,
      lastName        VARCHAR(50) NOT NULL,
      birthday        VARCHAR(50) NOT NULL,
      idCard          DECIMAL(20,2) NOT NULL, 
      imgIdCard       BLOB  NOT NULL,
      dl              VARCHAR(50) NOT NULL,
      dlPicture       BLOB NOT NULL,
      email           VARCHAR(50) NOT NULL,
      phoneNumber     VARCHAR(50) NOT NULL,
      adress          VARCHAR(50) NOT NULL,
      gender          VARCHAR(50) NOT NULL,
      rate            DECIMAL(50,2) NOT NULL,
      kmPrice         DECIMAL(5,2) NOT NULL,
      carType         VARCHAR(50) NOT NULL,
                      PRIMARY KEY (id)
        );
