const express = require('express');
const app = express();

//Opens the server.
app.listen(3000,()=>{
    console.log('app listening in port 3000');
});

//Sets the server to serve html files.
app.set('view engine','html');

//Sets the server to get its resources from the specified directory.
app.use(express.static(__dirname+'/'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/Home.html');
});