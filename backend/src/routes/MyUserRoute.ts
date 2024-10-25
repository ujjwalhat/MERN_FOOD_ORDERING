import express from "express"
import {createCurrentUserr} from "../contollers/MyUserController"

const router = express.Router();
router.post('/',createCurrentUserr)

export default router