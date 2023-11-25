import { Router } from "express";

const router = Router();

router.get("/", MeetingController.index);
router.get("/:id", MeetingController.find);
router.post("/", createMeeetingValidation, MeetingController.create);
router.put("/:id", updateMeeetingValidation, MeetingController.update);
router.delete("/:id", MeetingController.deleting);

export default router;
