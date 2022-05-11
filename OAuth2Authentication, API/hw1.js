const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
const jwt =require("jsonwebtoken")

app.use(express.json());
app.use(express.urlencoded())

const data = mysql.createPool({
    
        namedPlaceholders: true,
        charset: 'utf8',
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "",
        database: "oauth_data",
    

})

data.query('select * from employee1',(err,result)=>{

    console.log(err,result)
})

app.use((req,res,next)=>{
        if(req.path == "/login")return next()


    const token =req.headers.authorization

    if(!token) return res.json({msg:"error no information"})
    
    try {
             jwt.verify(token.split(' ')[1],key)
             next()
        } catch (error) {
            return res.json({msg:"error no information"})
        }
    

})

app.post('/login', (req, res) => {   
    

    if(req.body.username == "test" && req.body.password == "1234"){

        const token = jwt.sign({username: "test"},key)
        
      
        return res.json({token})

    } 

        return res.status(400).send("error")
    

})

app.get('/getData', (req, res) => {


    data.query('select * from employee1',(err,result)=>{

        console.log(err,result)
        return res.send(result);
    })
    
});

app.put('/update', (req, res) => {

  
    if(!req.body.id||!req.body.pos||!req.body.tel||!req.body.email){

            return res.status(400).send(error)

    }

    data.query('update employee1 set pos = :pos, tel = :tel ,email =:email where id = :id',{
      
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email

    },(err, result) => {
            if(err){

                    return res.status(400).json(err)
            }
            return res.json("update success")

    })

  

});




app.post('/create', (req, res) => {
   

    data.query('insert into employee1 value(:fname, :lname, :id, :pos, :tel, :email)',{
        fname: req.body.firstname,
        lname: req.body.lastname,
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email

    },(err, result) => {
            if(err){

                    return res.status(400).json(err)
            }
            return res.json("Add DataSuccess")

    })
    
});


app.delete('/delete', (req, res) => {

       
    data.query(`DELETE from employee1 WHERE id = '${req.body.id}'`, (err,rows) =>{
           
        if(err){
            return res.status(400).send(error)
        }else{
            
            res.send('DELETE Success')
        }

    })


});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});