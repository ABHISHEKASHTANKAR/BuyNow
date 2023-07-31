import Razorpay from 'razorpay';
import crypto from 'crypto';


export const paymentOrder = (req, res) => {
    try{
        let instance = new Razorpay({key_id : process.env.PAYMENT_ID, key_secret : process.env.PAYMENT_SECRET_KEY});

        let options = {
            amount : req.body.amount * 100,
            currency : 'INR',
        }
        instance.orders.create(options, (err, order)=>{
            if(err){
                res.status(400).json({message : "Network Error!!"});
            }
            else{
                res.status(200).json(order);
            }
        })
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
}

export const paymentVerify = (req, res) =>{
    try{

        let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

        let expectedSignature = crypto.createHmac('sha256', process.env.PAYMENT_SECRET_KEY)
                                    .update(body.toString())
                                    .digest('hex');
        let response = {signatureIsValid : false};
        if(expectedSignature === req.body.response.razorpay_signature);{
            response = {signatureIsValid : true};
        }
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
}