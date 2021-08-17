const { urlencoded } = require("body-parser");
const express= require('express')
const authController=require('../controller/authController')
const router=express.Router()
const bodyParser=require('body-parser')
var urlEncoder=bodyParser.urlencoded({extended:true})

router.post('/registerData',urlEncoder,authController.register)
router.post('/getData',urlEncoder,authController.fatchData)
// router.post('/editData/:id',urlEncoder,authController.edit)
router.get('/editData',authController.edit)
router.post('/updateData',urlEncoder,authController.update)
router.get('/deleteData',authController.delete)
module.exports=router;