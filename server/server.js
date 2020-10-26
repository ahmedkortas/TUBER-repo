const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

const port = 5000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


app.use('/users', users);
app.use('drivers', drivers);





app.listen(port,console.log(`Connected to ${port}`))

