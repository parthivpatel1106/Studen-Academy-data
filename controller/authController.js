const express=require('express')
const mysql=require('mysql')
const { conn } = require('../app')
const app =express()
// const router=express.Router()
// const bodyParser=require('body-parser')
// const jsonParser=bodyParser.json()
// const urlEncoder=bodyParser.urlencoded({extended:true})


exports.register=(req,res)=>{
    // const field=['Computer Engineering','Civil Engineering', 'Chemical Engineering', 'Electrical Engineering','Electronics and Communication', 'Mechanical Engineering']
    const fname=req.body.firstname;
    const mname=req.body.middlename;
    const lname=req.body.lastname;
    const enrollmentid=req.body.enrollmentid;
    const email=req.body.emailid;
    const contact=req.body.contactno;
    const gender=req.body.gender;
    const city=req.body.cityname;
    const pincode=req.body.pincode;
    const branchname=req.body.branches;
    //console.log(branchname)
    //console.log(field[branchname+1])
    conn.query('INSERT INTO student_data SET ?',{first_name:fname,last_name:lname, middle_name:mname, enrollment_id:enrollmentid,email_id:email, contact_no:contact, gender:gender, city:city, pin_code:pincode, branch_name:branchname},(error,results)=>{
        if(error)
        {
            console.log(error)
            return res.render('studentRegister',{
                message:"student already registered"
            })
        }
        else
        {
            console.log(results)
            console.log("results added")
            return res.render('studentRegister',{
                message:'Student registered successfully'
            })
            //return res.redirect('/auth/getData')
        }
    })
}

exports.fatchData=(req,res)=>{
    const enrollmentid=req.body.enrollment
    //console.log(enrollmentid)
    // if(!(conn.query('SELECT * FROM student_data WHERE enrollment_id = ?',[enrollmentid],async(error))))
    conn.query('SELECT * FROM student_data WHERE enrollment_id = ?',[enrollmentid], async(error,result)=>{
            //console.log(result[0])
        if(result[0]==undefined)
        {
            console.log("here")
            return res.render('getStudentData',{
                message:"student not found"
            })
        }
        if(error){
            console.log(error)
        }
        else
        {
            var string=JSON.stringify(result[0])
            var json=JSON.parse(string)
            function name(a,b,c)
            {
                return a+" "+b+" "+c;
            }
            var fullName=name(json.first_name,json.middle_name,json.last_name)
            console.log(fullName)
            const id=json.ID
            module.exports=id
            console.log(id)
            return res.render('studentDataDisplay',{
                    name:fullName,
                    enroll:json.enrollment_id,
                    email:json.email_id,
                    contact:json.contact_no,
                    gender:json.gender,
                    city:json.city,
                    pincode:json.pin_code,
                    branch:json.branch_name
            })
        }
    })
}

exports.edit=(req,res)=>{
    const id = require("./authController")
    conn.query("SELECT * FROM student_data WHERE ID =?",[id],async(error,result)=>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            var string=JSON.stringify(result[0])
            var json=JSON.parse(string)
            return res.render('editStudentData',{
                fname:json.first_name,
                lname:json.last_name,
                mname:json.middle_name,
                enroll:json.enrollment_id,
                email:json.email_id,
                contact:json.contact_no,
                gender:json.gender,
                city:json.city,
                pincode:json.pin_code,
                branch:json.branch_name
            })
        }
    })
}

exports.update=(req,res)=>{
    const id=require("./authController")
    const fname=req.body.firstname;
    const mname=req.body.middlename;
    const lname=req.body.lastname;
    const enrollmentid=req.body.enrollmentid;
    const email=req.body.emailid;
    const contact=req.body.contactno;
    const gender=req.body.gender;
    const city=req.body.cityname;
    const pincode=req.body.pincode;
    const branchname=req.body.branches;
    var sql="UPDATE student_data SET first_name=?, middle_name=?,last_name=?,enrollment_id=?,email_id=?,contact_no=?,gender=?,city=?,pin_code=?,branch_name=? WHERE ID=?"
    conn.query(sql,[fname,mname,lname,enrollmentid,email,contact,gender,city,pincode,branchname,id],(error,result)=>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            //console.log(result)
            console.log("data updated")
            return res.redirect('editStudentData',{
                message:"Data updated Successfully"
            })
        }
    })
}

exports.delete=(req,res)=>{
    const id=require('./authController')
    conn.query("DELETE FROM student_data WHERE ID=?",[id],(error,result)=>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log("deleted")
            return res.render('studentDataDisplay',{
                message:"data Successfully deleted"
            })
        }
    })
}
//module.exports=router