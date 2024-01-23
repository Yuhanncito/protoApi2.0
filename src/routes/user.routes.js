import { Router } from "express";
import * as userController from "../controllers/user.controller"
const router = Router();
router.post('/signup',userController.singUp)
router.post('/signin',userController.singIn)
router.get('/',userController.getAll)
export default router;