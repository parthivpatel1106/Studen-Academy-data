const express = require('express')
const app =express()
const mysql=require('mysql')
const router = express.Router()
require('dotenv').config()
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')

const port=process.env.PORT

// code for creating local server starts
app.listen(port,()=>{
    console.log(`server starts at localhost ${port}`)
})
// code for creating local server ends


// connecting mysql database with nodejs server
var connect=mysql.createConnection({
    user:process.env.USER,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    multipleStatement:true  //multiquery at one time
})
connect.connect(function(err){
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("database connected")
    }
})

module.exports.conn=connect
// setting up view engine for html pages
app.set('view engine','hbs')

// routing requests 
app.use('/',require('./routes/routes'))
app.use('/auth',require('./routes/auth'))
app.use(express.static('./public'))

var jsonParser=bodyParser.json()
var urlEncoder=bodyParser.urlencoded({extended:true})

app.use(cookieParser)