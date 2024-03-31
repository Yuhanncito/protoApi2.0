import { Router } from "express";
import * as jwt from "../middlewares/authJWT"
import * as invitate from "../controllers/invitation.controller"
const router = Router();

router.post('/',jwt.verifyToken,invitate.setInvitatio);
router.get('/:id',jwt.verifyToken,invitate.getInvitationsByUserId)

export default router;