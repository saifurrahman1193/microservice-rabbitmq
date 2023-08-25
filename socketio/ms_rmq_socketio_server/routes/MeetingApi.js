import { Router } from "express";
import * as MeetingController from "../controller/MeetingController.js";
const router = Router();

router.post("/create", MeetingController.create);

export default router;
