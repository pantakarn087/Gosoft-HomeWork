const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const port = 3000;
const jwt =require("jsonwebtoken")
const cookieparser = require('cookie-parser')

app.use(express.urlencoded())
app.use(express.json())
app.use(cookieparser())



app.get('/', (req,res) => {   
        res.sendFile(__dirname+"/login.html")

});

app.get('/home', (req,res) => {   
    console.log(req.cookies)
 try {

    if(!req.cookies)return res.redirect('/')
    if(!req.cookies.token)return res.redirect('/')
    
   
         jwt.verify(req.cookies.token,"132456")
         res.sendFile(__dirname+"/index.html")
    } catch (error) {
        console.log('error')
        res.redirect('/')
    }

});


app.post('/login', (req, res) => {   
    console.log(req.body)

    if(req.body.username == "test" && encrypt_pass(req.body.password) == encrypt_pass("1234")){

        const token = jwt.sign({username: "test"},"132456")
        
        res.cookie('token',token)
        res.redirect('/home')

    }else{ 

        res.cookie('token',"")
        res.sendFile(__dirname+"/login.html")

    }

    
});

function encrypt_pass(p) {

    bcrypt.genSalt(10, function(err, Salt) {

        bcrypt.hash(p, Salt, function(err, hash) {
            console.log(hash)
            return hash
        })

    });

};


app.listen(port, () => {
console.log(`Listening at http://localhost:${port}`);
});


