import { Router } from "express";
import * as tasksCotroller from "../controllers/task.cotroller"
import * as jws from "../middlewares/authJWT"

const router = Router();

router.post('/',jws.verifyToken,tasksCotroller.getTaskByProjectId);
router.post('/newTask',jws.verifyToken,tasksCotroller.insertTask);
router.put('/:id');
router.delete('/:id',[jws.verifyToken,jws.isModerator],tasksCotroller.deleteTask)

export default router;
