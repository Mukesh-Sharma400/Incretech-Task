import express from "express";
import { savecart, signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/savecart", savecart);

export default router;
