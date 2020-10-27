const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tuber',
    insecureAuth: true
});

const getAllDrivers = (callback) => {
    let syntax = `SELECT * FROM drivers`;
    connection.query(syntax, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
};

const getADriver = (email, callback) => {
    let syntax = `SELECT email FROM drivers WHERE email= '${email}' `;
    connection.query(syntax, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

const addNewDriver = (firstName, lastName, email, password, yearOfBirth, idCard, driveLicense, car, location, km, gender, rate, callback) => {
    let syntax = `INSERT INTO drivers(firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES('${firstName}','${lastName}','${email}','${password}',${yearOfBirth},${idCard},${driveLicense},'${car}','${location}',${km},'${gender}',${rate})`;
    connection.query(syntax, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

const getEmailAndPassword = (email, password, callback) => {
    let syntax = `SELECT * FROM drivers WHERE email= '${email}' AND password = '${password}' `;
    connection.query(syntax, (err, result) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, result)
        }
    })
}

module.exports.getAllDrivers = getAllDrivers;
module.exports.addNewDriver = addNewDriver;
module.exports.getADriver = getADriver;
module.exports.getEmailAndPassword = getEmailAndPassword;