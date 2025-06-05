import express from "express";
import { signup, login, logout, getAllUsers } from "../controllers/auth.controller.js";
import { protectedRoute } from "../middlewares/protected.middleware.js";

const router=express.Router();

router.get('/getAllUsers', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', protectedRoute, logout);

export default router;