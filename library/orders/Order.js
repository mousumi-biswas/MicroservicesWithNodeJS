const mongoose = require('mongoose');

mongoose.model('Order', {
    CustomerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    BookId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    initialDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    }
})