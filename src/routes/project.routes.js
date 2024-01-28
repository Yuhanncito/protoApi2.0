import { Router } from "express";
import * as projectCotroller from '../controllers/project.controller'
import * as jws from "../middlewares/authJWT"
const router = Router();
router.post('/',jws.verifyToken,projectCotroller.insertProject);
router.get('/',jws.verifyToken,projectCotroller.getProjectsWithTaskUsers);
router.delete('/delete',jws.verifyToken,projectCotroller.deleteProjects);
router.put('/update',jws.verifyToken,projectCotroller.updateProject);
export default router;
