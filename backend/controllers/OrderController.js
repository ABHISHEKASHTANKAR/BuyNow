import Orders from '../models/OrderModel.js';


export const getAllOrders = async (req, res) => {
    try{

        const orders = await Orders.find();
        
        res.status(200).json(orders);

    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const makeOrder = async (req, res) => {
    try{
        const user = req.params.userId;
        
        const {products} = req.body;

        const newOrder = {
            user,
            products
        }

        const result = new Orders(newOrder);

        const savedOrder = await result.save();

        res.status(201).json(savedOrder);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}

export const getOrderById = async(req, res) => {
    try{
      
        const id = req.params.userId;
        const orders = await Orders.find({user : id});
        res.status(200).json(orders);
    }
    catch(err){
        res.status(500).json({error : err.message});
    }
}