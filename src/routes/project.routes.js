import { Router } from "express";
import * as projectCotroller from '../controllers/project.controller'
import * as jws from "../middlewares/authJWT"
import * as verifyRole from "../middlewares/authRole"
const router = Router();
router.post('/',[jws.verifyToken,verifyRole.verifyRole],projectCotroller.insertProject);
router.get('/',jws.verifyToken,projectCotroller.getProjectsWithTaskUsers);
router.put('/update',jws.verifyToken,projectCotroller.updateProject);
router.delete('/delete',jws.verifyToken,projectCotroller.deleteProject)
router.put('/getById',jws.verifyToken,projectCotroller.getProjectsById)
export default router;
