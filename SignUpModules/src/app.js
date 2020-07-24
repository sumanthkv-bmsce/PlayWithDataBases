const express = require("express")
const hbs = require("hbs")
const bodyparser = require("body-parser")
const path = require("path")
const mysql = require("mysql")
const url = require("url")

const app = express()
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'..','/public')))
app.set('views',path.join(__dirname,'..','/src/templates'))
app.set('view engine','hbs')

const mysqlcon = mysql.createConnection({
    host:"localhost",
    port:3306,
    user: "admin",
    password: "sumanth@04",
    database: "contact"
})

mysqlcon.connect((err)=> {
    if(err) throw err;
    console.log("Connected")
})


app.get("/",(req,resp)=> {
    resp.render("index",{
        val:req.query.valid
    })
})

app.post("/signup",(req,resp)=> {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const dob = req.body.dob;
    const gender = req.body.gender;

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    sql = `INSERT into register VALUES("${name}","${email}","${password}","${dob}","${dateTime}","${gender}")`
    
    mysqlcon.query(sql,(err,res)=> {
        if(err) {
            return resp.redirect(url.format({
                pathname:"/",
                query: {
                   "valid":"Already have an account with this email..!! Try to Login"
                 }
              }));
        }

        resp.render("welcome");
    })
})

app.all("/login",(req,res)=> {
    res.render("login",{
        val:req.query.valid
    })
})

app.post("/login/check",(req,resp)=> {

    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * from register where email="${email}" && password="${password}"`

    mysqlcon.query(sql,(err,res)=> {
        
        if(err) throw err;

        if(res.length>0) {
            resp.render("welcome")
        }
        else {
            resp.redirect(url.format({
                pathname:"/login",
                query: {
                   "valid":"Invalid inputs"
                 }
              }))
        }

    })

})

app.listen(8080,(req,res)=> {
    console.log("Listening on port 8080")
})