const express = require("express")
const bodyparser = require("body-parser")
const path = require("path")
const hbs = require("hbs")
const mysql = require('mysql')

const app = express()
app.use(express.static(path.join(__dirname,'..','/public')))
app.use(bodyparser.urlencoded({ extended: false }));
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
    
    resp.render("index")
})

app.post("/register",(req,resp)=> {

    const email = req.body.email;
    const name = req.body.name;
    const subject = req.body.subject;
    const query = req.body.query;
    const message = req.body.message;

    const sql = `INSERT into queries values("${email}","${name}","${subject}","${query}","${message}")`;
    mysqlcon.query(sql,(err,res)=> {
        if(err) throw err;

        resp.render("register",{
            email,name,subject,query,message
        })
    })
})

app.get("/allreviews",(req,resp)=> {

    const sql = "SELECT email,name,subject,query,message from queries";


    mysqlcon.query(sql,(err,res)=> {
       
        resp.render("allreviews",{
            res:JSON.stringify(res)
        })
    })

})

app.listen(8080,(req,res)=> {
    console.log("Listening on 8080")
})

