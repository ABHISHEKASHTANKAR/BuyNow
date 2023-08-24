import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';
import bcrypt from 'bcrypt'
import { response } from 'express';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {

    try{

        const {name, email, password, role, mobileNo, address} = req.body;

        const user = await User.findOne({email : email});

        if(user){
            res.status(400).json({error : "User Already Exist, Please Sign In!!"});
        }

        const salt = await bcrypt.genSalt();

        const passwordHash = await bcrypt.hash(password, salt);
    
        const newUser = {
            name,
            email,
            password : passwordHash,
            role,
            mobileNo,
            address
        }
    
        const result = new User(newUser);
        const savedUser = await result.save();
        
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }

}

export const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email : email});
        if(!user){
            return res.status(400).json({error : "User does not exist. Please register first!!"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({error : "Invalid credentials. Please check your password!!"});
        }

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
        }

        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY);

        res.cookie('token', token, options);

        res.status(200).json({user, token});
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const logoutUser = (req, res) =>{
    try{
        res.clearCookie('token');
        res.status(200).json({message : "Log Out Successful."});
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const getUser = async(req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).select({password : 0});
        if(!user){
            res.status(400).json({error : "Your Session has expired!! Please Sign In again!!"});
        }
        else{
            res.status(200).json(user);
        }
    }
    catch(err){
        res.status(400).json({error : err.message});
    }
}

export const updateUser = async(req, res) => {
    try{
        const {id} = req.params;
        const response = await User.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(response);
    }
    catch(err){
        res.status(400).json({error : err.message});
    }
}

export const addToCart = async(req, res) => {
    try{
        const {userId, product} =  req.body;
        const user = await User.findById(userId);
        let userCart = user.cart;

        let existingProduct = false;

        for(let i=0; i<userCart.length; i++){
            if(userCart[i]._id === product._id){
                existingProduct = true;
                break;
            }
        }

        if(existingProduct === false){
            userCart = [...userCart, product];
            const response = await User.findByIdAndUpdate(userId, {cart : userCart}, {new : true});
            res.status(200).json(response);
        }

        res.status(400).json({message : "Product is already present in cart!!"});
        
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const getProductsFromCart = (req, res) => {
    try{
        
    }
    catch(err){

    }
}

export const addToWishList = async(req, res) =>{
    try{
        const {userId, productId} =  req.body;
        const user = await User.findById(userId);
        let userWishlist = user.wishlist;

        if(!userWishlist.includes(productId)){
            userWishlist = [...userWishlist, productId];
            const response = await User.findByIdAndUpdate(userId, {wishlist : userWishlist}, {new : true});
            res.status(200).json(response);
        }
        else{
            res.status(400).json({message : "Product is already present in wishlist!!"});
        }
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const getWishlist = async(req, res) => {
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        let userWishlist = user.wishlist;
        res.status(200).json(userWishlist);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const getProductsFromWishList = async(req, res) => {
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        let userWishlist = user.wishlist;
        const responseArr = [];
        for(let i=0; i<userWishlist.length; i++){
            const product = await Product.findById(userWishlist[i]);
            responseArr.push(product);
        }
        res.status(200).json(responseArr);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

