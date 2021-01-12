const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
require("./Book");
const Book = mongoose.model("Book");

app.use(bodyParser.json());


try {
    mongoose.connect( "mongodb+srv://mousumi:microservice123@cluster0.naiah.mongodb.net/booksservice?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("Database connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }

app.post('/book', (req,res)=>{
   var newBook = {
       title: req.body.title,
       author: req.body.author,
       numberPages: req.body.numberPages,
       publisher: req.body.publisher
   }
   var book = new Book(newBook);

   book.save().then(()=>{
       console.log("New book created")
   }).catch((err) => {
       if(err) {
           throw err;
       }
   })
   res.send("A new book created!!")
})

app.get('/books', (req,res)=>{
 Book.find().then((books)=>{
     //console.log(books);
     res.json(books);

 }).catch(err=>{
     if(err){
         throw err;
     }
 })
})

app.get('/book/:id', (req,res)=>{
   Book.findById(req.params.id).then((book)=>{
       if(book){
       res.json(book);
       }
   }).catch(err=>{
       if(err){
           throw err;
       }else {
           res.sendStatus(404);
       }
   })
})

app.delete('/book/:id', (req,res)=>{
    Book.findOneAndRemove(req.params.id).then(()=>{
        res.send("Book removed");
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545, ()=>{
    console.log('Listening to port: This is our book service')
})