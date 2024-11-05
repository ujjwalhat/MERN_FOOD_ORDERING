import express from "express"
import {createCurrentUserr} from "../contollers/MyUserController"
import { jwtCheck } from "../middleware/auth";

const router = express.Router();
router.post('/',jwtCheck,createCurrentUserr)

export default router