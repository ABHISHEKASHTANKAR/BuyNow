import express from 'express';


import { getAllProducts, addProduct, getProduct, updateProduct, deleteProduct, searchProducts, getProductByCategory, getProductsPerPage,
        getProductsAsPerFilter} from '../controllers/ProductController.js';

const router = express.Router();


router.get("/products", getAllProducts);

router.get("/products/:id", getProduct);

router.post("/products" ,addProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

router.get("/products/search/:keyword", searchProducts);

router.get("/products/category/:category", getProductByCategory);

router.get("/products/brand/:brand", getProductByCategory);

router.get("/productsperpage", getProductsPerPage);

router.post('/productsperfilter', getProductsAsPerFilter);


export default router;