import { Router } from "express";
import * as MeetingController from "../app/http/controller/MeetingController.js";
import { createMeeetingValidation } from '../app/http/validation/MeetingValidation.js';
const router = Router();

router.get("/", MeetingController.index);
router.post("/", createMeeetingValidation, MeetingController.create);
router.delete("/:id", MeetingController.deleting);
// router.patch("/:id", MeetingController.update);

export default router;
