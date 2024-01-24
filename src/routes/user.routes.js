import { Router } from "express";
import * as userController from "../controllers/user.controller"
const router = Router();
router.post('/signup',userController.singUp)
router.post('/signup/confirm',userController.confirmSingUp)
router.post('/signin',userController.singIn)
router.post('/signin/confirm',userController.confirmSingIn)
router.get('/',userController.getAll)
export default router;
