const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const userData = []
let fname;
let lname;
let id;
let pos;
let tel;
let email;

app.get('/getData', (req, res) => {
    res.send({ userData });
});

app.put('/update', (req, res) => {

    let idup = req.body.idup;

    fname = req.body.firstname;
    lname = req.body.lastname;
    id = req.body.id;
    pos = req.body.pos;
    tel = req.body.tel;
    email = req.body.email;

    console.log(idup)

    for (let i = 0; i < userData.length; i++) {
        if (email === userData[i].email || tel === userData[i].tel) {
            return res.status(400).send("Bad Request");
        }
        if (idup == userData[i].id) {
            userData.splice(i, 1, {
                firstname: fname,
                lastname: lname,
                id: id,
                pos: pos,
                tel: tel,
                email: email
            });
            return res.send('update success');
        }
    }
    return res.status(400).send("Bad Request");

});

app.post('/create', (req, res) => {
    fname = req.body.firstname;
    lname = req.body.lastname;
    id = req.body.id;
    pos = req.body.pos;
    tel = req.body.tel;
    email = req.body.email;

    for (let i = 0; i < userData.length; i++) {

        if (id === userData[i].id || email === userData[i].email || tel === userData[i].tel) {
            return res.status(400).send("Bad Request");
        }
    }
    userData.push({
        firstname: fname,
        lastname: lname,
        id: id,
        pos: pos,
        tel: tel,
        email: email
    })


    return res.send("Add DataSuccess");
});

app.delete('/delete', (req, res) => {

    id = req.body.id;
    for (let i = 0; i < userData.length; i++) {
        console.log(userData[i])
        if (id == userData[i].id) {
            userData.splice(i, 1);
            return res.send('Delete Success');
        }
    }
    return res.status(400).send("Bad Request");


});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});