import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        min : 3,
        max : 50
    },
    email : {
        type : String,
        required : true,
        unique : [true, "You are already registered!! Please Sign In!!"],
    },
    password : {
        type : String, 
        required : true,
    },
    role : {
        type : String, 
        default : "user",
    },
    mobileNo : {
        type : String,
        unique : true,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    cart : {
        type : Array,
        default : [],
    },
    wishlist : {
        type : Array,
        default : []
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
