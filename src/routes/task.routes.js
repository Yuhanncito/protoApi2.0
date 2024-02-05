import { Router } from "express";
import * as tasksCotroller from "../controllers/task.cotroller"
import * as jws from "../middlewares/authJWT"

const router = Router();

router.post('/',jws.verifyToken,tasksCotroller.getTaskByProjectId);
router.post('/newTask',jws.verifyToken,tasksCotroller.insertTask);

export default router;
