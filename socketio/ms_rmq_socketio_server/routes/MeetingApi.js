import { Router } from "express";
import * as MeetingController from "../controller/MeetingController.js";
const router = Router();

router.get("/", MeetingController.index);
router.post("/", MeetingController.create);
// router.delete("/:id", MeetingController.destroy);
// router.patch("/:id", MeetingController.update);

export default router;
