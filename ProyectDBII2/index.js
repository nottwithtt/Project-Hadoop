const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const mongoDB = require('mongodb');
const URI = 'mongodb+srv://nottwithtt:Nicolita1998+@cluster0.gi2w4fi.mongodb.net/dbProjectII?retryWrites=true&w=majority';
const conn = mongoose.createConnection(URI, {useNewUrlParser: true});

const storage = new GridFsStorage({ db: conn,
    file:(req,file)=>{
        return {
            filename: file.originalname,
            bucketName: 'files',
        };
    } 
});

let gfs;

//Warns that the connection has been opened.
conn.once('open',()=>{
    console.log('Open');
    gfs = new mongoDB.GridFSBucket(conn.db, {bucketName: 'files'});
});

//Declares multer middleware to use with gridfs.
const upload = multer({storage});

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

app.post("/getJob1",async (req,res)=>{
    let job1 = await getJob('Job1');
    res.json({"answer":job1});
})

app.post("/getJob2",async (req,res)=>{
    let job2 = await getJob('Job2');
    let listRegion = [];
    for (let i = 0; i < job2.length; i++) {
        if(!listRegion.includes(job2[i].Region)){
            listRegion.push(job2[i].Region);
        }
    }

    console.log(listRegion);
    res.json({"answer":job2});
})

app.post("/getJob3",async (req,res)=>{
    let job3 = await getJob('Job3');
    let listSubRegion = [];
    for (let i = 0; i < job3.length; i++) {
        if(!listSubRegion.includes(job3[i].SubRegion)){
            listSubRegion.push(job3[i].SubRegion);
        }
    }

    console.log(listSubRegion.sort());
    res.json({"answer":job3});
})


app.post("/getJob4",async (req,res)=>{
    let job4 = await getJob('Job4');

    res.json({"answer":job4});
})

app.post("/getJob5",async (req,res)=>{
    let job5 = await getJob('Job5');

    res.json({"answer":job5});
})

app.post("/getJob6",async (req,res)=>{
    let job6 = await getJob('Job6');

    res.json({"answer":job6});
})


app.post("/getJob7",async (req,res)=>{
    let job7 = await getJob('Job7');

    res.json({"answer":job7});
})

app.post("/getJob8",async (req,res)=>{
    let job8 = await getJob('Job8');

    
    res.json({"answer":job8});
})

async function getJob(name){
    let jobs = await conn.collection(name).find();
    let jobsLists = await jobs.toArray();
    return jobsLists;
}