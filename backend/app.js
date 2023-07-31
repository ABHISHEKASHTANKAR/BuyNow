import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';




// Route Imports
import productRoute from './routes/ProductRoutes.js'
import userRoute from './routes/UserRoutes.js'
import orderRoute from './routes/OrderRoutes.js'
import paymentRoute from './routes/PymentRoutes.js'




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(cors({
    origin: true, // Replace with your React.js application's origin
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', productRoute);
app.use('/api', userRoute);
app.use('/api', orderRoute);
app.use('/api', paymentRoute);

const uploadPath = path.join(__dirname, "images");

app.use("/products", express.static(uploadPath));

export default app;