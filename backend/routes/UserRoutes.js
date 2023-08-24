import express from 'express';

import { addToWishList, loginUser, logoutUser, registerUser, getUser, updateUser, addToCart, getProductsFromWishList, getWishlist } from '../controllers/UserController.js';
import { verifyToken } from '../middlewares/UserAuth.js';

const router = express.Router();

router.post("/register" , registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);



router.get("/user/:id", getUser);
router.put("/user/update/:id", updateUser);
router.post("/wishlist", addToWishList);
// router.get("/wishlist/:userId", verifyToken, getProductsFromWishList);
router.get("/wishlist/:userId", getWishlist);
router.post("/cart/add", addToCart);

export default router;