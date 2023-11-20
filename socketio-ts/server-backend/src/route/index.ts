import express, { Router, Request, Response } from 'express';
// import MeetingApi from "./MeetingApi";
const router = Router();

// router.use("/api/meeting", MeetingApi);
router.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Hello saifur' })
})

export default router;
