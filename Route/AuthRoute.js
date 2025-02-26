import express from "express";
import { registerUser, getuser, login, profile } from "../Controller/AuthController.js";
import { protect } from "../Middlware/auth.js";
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);

router.get('/getuser', protect, profile);

export default router;