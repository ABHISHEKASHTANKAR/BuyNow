import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter Product Name!!"],
        min : 2,
        max : 50,
    },
    description : {
        type : String,
        required : [true, "Please Enter Description!!"],
        default : "NA",
        min : "5",
        max : "500"
    },
    price : {
        type : Number,
        required : [true, "Please Enter Price!!"],
        min : 1,
        max : 5000000
    },
    brand : {
        type : String,
        required : [true, "Please Enter Brand Name!!"],
        min : 1,
        max : 50,
        default : ""
    },
    category : {
        type : Array,
        required : [true, "Please Enter Category!!"],
        default : [],
    },
    rating : {
        type : Number,
        required : true,
        default : 0,
    },
    stock : {
        type : Number,
        required : true,
        min : 1,
        max : 100000,
    },
    image : {
        type : String,
        required : [true, "Please Provide Product Image!!"],
    },
    noOfReviews : {
        type : Number,
        default : 0,
    },
    reviews : [
        {
            name : {
                type : String,
                required : true,
            },
            rating : {
                type : Number,
                required : true,
            },
            comment : {
                type : String,
            }
        }
    ]
   
}, {timestamps : true});

const ProductModel = mongoose.model('products', ProductSchema);


export default ProductModel;