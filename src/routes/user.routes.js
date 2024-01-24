import { Router } from "express";
import * as userController from "../controllers/user.controller"
import * as jws from "../middlewares/authJWT"
const router = Router();
router.post('/signup',userController.singUp)
router.post('/signup/confirm',userController.confirmSingUp)
router.post('/signin',userController.singIn)
router.post('/signin/confirm',userController.confirmSingIn)
router.post('/forgotPassword',userController.forgotPassword)
router.post('/forgotPassword/confirm',userController.forgotPasswordVerify)
router.put('/forgotPassword/update',jws.verifyToken,userController.updatePassword)
router.get('/',userController.getAll)
export default router;
