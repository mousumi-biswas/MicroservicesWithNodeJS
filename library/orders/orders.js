const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const axios = require('axios');

const mongoose = require('mongoose');
const { response } = require('express');
require('./Order');
const Order = mongoose.model('Order');
app.use(bodyParser.json());




try {
    mongoose.connect( "mongodb+srv://mou:order_2020@cluster0.naiah.mongodb.net/ordersservice?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("Database connected"));    
    }catch (error) { 
    console.log("could not connect");    
    }





app.post('/order', (req,res)=>{
    var newOrder = {
        CustomerId: mongoose.Types.ObjectId(req.body.CustomerId),
        BookId: mongoose.Types.ObjectId(req.body.BookId),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }
    var order = new Order(newOrder);

    order.save().then(()=>{
        //console.log('Order created');
        res.send('Order created');
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    //console.log('Test it out');
  
})

app.get('/orders', (req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders);
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.get('/order/:id', (req,res)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:5555/customer/" + order.CustomerId).then((response)=>{
               var orderObject = {customerName: response.data.name, bookTitle: ''}
               
               
               axios.get("http://localhost:4545/book/" + order.BookId).then((response)=>{
               orderObject.bookTitle = response.data.title;
               res.json(orderObject)
            })
            
            })


        }else{
            res.send("Invalid order")
        }
    })
})

app.listen(7777, ()=>{
    console.log('Listening to port: This is our order service')
})