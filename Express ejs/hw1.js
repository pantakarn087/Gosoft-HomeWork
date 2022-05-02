const express = require('express');
const app = express();
const port = 3000;
const solve24game = require('24game-solver/dist/24game-solver');


app.get('/number', (req, res) => {   
let t = false;
const numarr = [];

numarr.push(req.query.num1)
numarr.push(req.query.num2)
numarr.push(req.query.num3)
numarr.push(req.query.num4)

    for( i=0; i<numarr.length ; i++){
        if(numarr[i] >=1 && numarr[i] <=9){
            
            t = true;
        } else {
            res.status(403).send('error');
        }}
    

     if(t === true){
    const result = solve24game([numarr[0], numarr[1], numarr[2], numarr[3]], 24);
    res.send('Success'+'\n'+result);

        }else if(result.length === 0){

        res.send('Fail');
    
    }

});
app.listen(port, () => {
console.log(`Listening at http://localhost:${port}`);
});


