const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "vQ0Jh8MyUe",
  password: "I9JMpmzQVi",
  database: "vQ0Jh8MyUe",
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});


const getAllDrivers = (callback) => {
  let syntax = `SELECT * FROM drivers`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const getADriver = (email, callback) => {
  let syntax = `SELECT email FROM drivers WHERE email= '${email}' `;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const addNewDriver = (
  firstName,
  lastName,
  email,
  password,
  yearOfBirth,
  idCard,
  driveLicense,
  car,
  location,
  km,
  gender,
  rate,
  callback
) => {
  let syntax = `INSERT INTO drivers(firstName,lastName,email,password,yearOfBirth,idCard,driveLicense,car,location,km,gender,rate) VALUES('${firstName}','${lastName}','${email}','${password}',${yearOfBirth},${idCard},${driveLicense},'${car}','${location}',${km},'${gender}',${rate})`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const getEmailAndPassword = (email, password, callback) => {
  let syntax = `SELECT * FROM drivers WHERE email= '${email}' AND password = '${password}' `;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const getHistory = (driver_id, callback) => {
  let syntax = `SELECT * FROM history WHERE driver_id="${driver_id}"`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const createHistory = (longtitude, lattitude, idCard, callback) => {
  let syntax = `INSERT INTO history(longitude, lattitude,driver_id) VALUES ("${longtitude}","${lattitude}",(SELECT id FROM drivers WHERE idCard=${idCard}))`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


//Getting a preview position for the online drivers
const getInfo = (email, info, callback) => {
  let syntax = ` UPDATE history SET available = '${info}' WHERE driver_id=(SELECT id FROM drivers WHERE email= '${email}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const getAllInfo = (email, callback) => {
  let syntax = `SELECT available FROM history WHERE driver_id=(SELECT id FROM drivers WHERE email='${email}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const submitReq = (request,lat,long,email, callback) => {
  let syntax = ` INSERT INTO requests(request, x, y, picker_id) VALUES('${request}',${lat},${long},(SELECT id FROM drivers WHERE email= '${email}'))`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const getAllReq = (emailPicker, callback) => {
  let syntax = `SELECT * FROM requests WHERE picker_id=(SELECT id FROM drivers WHERE email='${emailPicker}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const updateReq = (answer,emailPicker, callback) => {
  let syntax = `UPDATE requests SET request = '${answer}' WHERE picker_id=(SELECT id FROM drivers WHERE email='${emailPicker}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const updateInfoRes = (email, callback) => {
  let syntax = ` UPDATE history SET available = 'no' WHERE driver_id=(SELECT id FROM drivers WHERE email= '${email}')`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};


const updatePosition = (email, lat, long,callback)=>{
  let syntax = ` UPDATE drivers SET latt = ${lat} , longi = ${long} WHERE email= '${email}'`;
  connection.query(syntax, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
}
 

module.exports.getAllDrivers = getAllDrivers;
module.exports.addNewDriver = addNewDriver;
module.exports.getADriver = getADriver;
module.exports.getEmailAndPassword = getEmailAndPassword;
module.exports.getHistory = getHistory;
module.exports.createHistory = createHistory;
module.exports.getInfo = getInfo;
module.exports.submitReq = submitReq;
module.exports.getAllReq = getAllReq;
module.exports.updateReq = updateReq;
module.exports.getAllInfo = getAllInfo;
module.exports.updateInfoRes = updateInfoRes;
module.exports.updatePosition = updatePosition;