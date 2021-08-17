const express = require('express')
const router=express.Router();
const bodyParser=require('body-parser')
const jsonParser=bodyParser.json();
const urlEncoder=bodyParser.urlencoded({extended:true})


router.get('/registration',function(req,res){
    // res.send("hello world")
    res.render('studentRegister')
})

router.get('/',function(req,res){
    res.render('homePage')
})

router.get('/getData',function(req,res){
    res.render('getStudentData')
})

// router.get('/editData',function(req,res){
//     res.render('editStudentData')
// })

router.get('/data',function(req,res){
    res.render('studentDataDisplay')
})

// router.get('/editData',(req,res)=>{
//     res.render('editStudentData')
// })
const id = require("../controller/authController")
router.get(`/editData/${id}`,(req,res)=>{
    res.render("editStudentData")
})
module.exports=router