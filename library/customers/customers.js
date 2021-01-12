const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
require('./Customer');
const Customer = mongoose.model("Customer");

app.use(bodyParser.json());
try {
    mongoose.connect( "mongodb+srv://mousumi:microservice123@cluster0.naiah.mongodb.net/customersservice?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }

app.post('/customer', (req,res)=>{
    var newCustomer = {
            name: req.body.name,
            city: req.body.city,
            address: req.body.address
    }
    var customer = new Customer(newCustomer);

    customer.save().then(()=>{
        console.log("New customer created")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })
    res.send("A new customer created!!")
 })
 app.get('/customers',(req,res)=>{
  Customer.find().then((customers)=>{
      res.json(customers);
  }).catch((err)=>{
        if(err){
            throw err;
        }
  })
 })

 app.get('/customer/:id', (req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
        res.json(customer);
        }
    }).catch(err=>{
        if(err){
            throw err;
        }else {
            res.sendStatus(404);
        }
    })
 })
 
 app.delete('/customer/:id', (req,res)=>{
     Customer.findOneAndRemove(req.params.id).then(()=>{
         res.send("Customer removed");
     }).catch(err =>{
         if(err){
             throw err;
         }
     })
 })


app.listen(5555, ()=>{
    console.log('Listening to port: This is our customer service')
})