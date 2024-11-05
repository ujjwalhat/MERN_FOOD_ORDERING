import { validateMyUserRequest } from '../middleware/validation';
import express from "express"
import {createCurrentUserr, updateCurrentUser} from "../contollers/MyUserController"
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();
router.post('/',jwtCheck,createCurrentUserr)
router.put("/",jwtCheck,jwtParse,validateMyUserRequest,updateCurrentUser)

export default router