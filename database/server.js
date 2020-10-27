var mysql = require("mysql");


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tuber',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});


// get data from database 
     
const getdata = (callback)=>{
  connection.query("SELECT * FROM drivers", (error,results,fields)=>{
      if(error) throw error;
      callback(results)
  })
}

// post data in database

const insertdata = (data, callback)=>{
  let str = `INSERT INTO drivers (firstName,lastName,birthday,idCard,imgIdCard,dl,dlPicture,email,phoneNumber,adress,gender,rate,kmPrice,carType) Values ("${data.firstName}","${data.lastName}","${data.birthday}","${data.idCard}","${data.imgIdCard}","${data.dl}","${data.dlPicture}","${data.email}","${data.phoneNumber}","${data.adress}","${data.gender}","${data.rate}","${data.kmPrice}","${data.carType}")`;
  connection.query(str,(error,results,fields)=>{
    if(error) throw error;
    callback(results)
  })
}



module.exports ={
  getdata,
  insertdata
}