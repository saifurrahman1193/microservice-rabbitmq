import { Router } from "express";
import * as MeetingController from "../app/http/controller/MeetingController.js";
import { createMeeetingValidation, updateMeeetingValidation } from '../app/http/validation/MeetingValidation.js';
const router = Router();

router.get("/", MeetingController.index);
router.get("/:id", MeetingController.find);
router.post("/", createMeeetingValidation, MeetingController.create);
router.put("/:id", updateMeeetingValidation, MeetingController.update);
router.delete("/:id", MeetingController.deleting);

export default router;
