import express from 'express';
import { getAllOrders, makeOrder, getOrderById } from '../controllers/OrderController.js';

const router = express.Router();

router.post('/order/:userId', makeOrder);
router.get('/order', getAllOrders);
router.get('/order/:userId', getOrderById );

export default router;