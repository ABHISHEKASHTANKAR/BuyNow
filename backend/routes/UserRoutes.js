import express from 'express';

import { addToWishList, loginUser, logoutUser, registerUser, getUser, updateUser, addToCart, getProductsFromWishList, getWishlist } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/UserAuth.js';

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);



router.get("/user/:id", verifyToken, getUser);
router.put("/user/update/:id", verifyToken, updateUser);
router.post("/wishlist", verifyToken, addToWishList);
// router.get("/wishlist/:userId", verifyToken, getProductsFromWishList);
router.get("/wishlist/:userId", verifyToken, getWishlist);
router.post("/cart/add", verifyToken, addToCart);

export default router;