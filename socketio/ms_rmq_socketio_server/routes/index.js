import { Router } from "express";
import MeetingApi from "./MeetingApi.js";
const router = Router();

router.use("/api/v1/meeting", MeetingApi);

export default router;
