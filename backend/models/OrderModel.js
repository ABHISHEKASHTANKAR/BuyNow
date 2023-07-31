import mongoose from 'mongoose';

const OrderScema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true,
    },
    state : {
        type : Number,
        required : true,
        default : 0
    },
    products : {
        type : Array,
        required : true,
    },
}, {timestamps : true});

const OrderModel  = mongoose.model('orders', OrderScema);

export default OrderModel;