const express = require('express');
const app = express(); 
const path = require('path'); 
const fs = require('fs'); 
const bodyparser = require('body-parser'); 
const mongoose = require('mongoose');

// serving static files
app.use('/static',express.static('static')); 
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyparser.json()); 
app.use(bodyparser.urlencoded({extended:true}));


// express middleware 

app.get('/' , (req,res)=>{
    res.status(200).sendFile(__dirname+'/index.html')
})
app.get('/contact' , (req,res)=>{
    res.status(200).sendFile(__dirname+'/contact.html')
})
app.get('/samples', (req,res)=>{
    res.status(200).sendFile(__dirname+'/samples.html')
})
app.listen(80,()=>{
    console.log('port started successfully ')
})

// mongoose
main().catch(err => console.log(err));

async function main() {
  mongoose.connect('mongodb://localhost:27017/AARYAN');
}

const contactshema = new mongoose.Schema({
    name2: String,
    email: String,
    state: String,
    number: String,
    COMMENT: String
  });
const contact = mongoose.model('entries', contactshema);

// contact html 


app.post('/entries' , (req,res)=>{
    var mydata = new contact(req.body)
    mydata.save().then(()=>{
      console.log('the item has been saved to the data base')
    }).catch(()=>{
      res.status(404).send('Item was not sent to the directory')
    })

    res.status(200).sendFile(__dirname+'/submit.html')
})