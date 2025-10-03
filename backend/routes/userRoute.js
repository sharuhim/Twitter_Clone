import express from "express";
import { Login, Register, bookmark, follow, getMyprofile, getOtherUser, logout,unfollow } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
const router=express.Router();
router.route("/register").post(Register); 
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated,bookmark);
router.route("/profile/:id").get(isAuthenticated,getMyprofile);
router.route("/otheruser/:id").get(isAuthenticated,getOtherUser); 
router.route("/follow/:id").post(isAuthenticated,follow);
router.route("/unfollow/:id").post(isAuthenticated,unfollow);


export default router;