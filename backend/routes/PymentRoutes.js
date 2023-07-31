import express from 'express';

import { paymentOrder, paymentVerify } from '../controllers/PaymentController.js';

const router = express.Router();

router.post('/payment/orders', paymentOrder);
router.post('/payment/verify', paymentVerify);

export default router;