const mongoose = require('mongoose');

mongoose.model('Customer', {

    name: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    }
   
})