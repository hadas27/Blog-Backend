import { AuthController } from '../Controllers/AuthController';
import { UserDataAccess } from '../DAL/UserDataAccess';
import { AuthBL } from '../BL/AuthBL';
import express, { Request, Response } from 'express';

const router = express.Router();
const authController = new AuthController(new AuthBL(new UserDataAccess)); // יצירת מופע של הקונטרולר

// הגדרת הנתיב לאימות עם Google באמצעות POST request
router.post('/google', async (req: Request, res: Response) => await authController.findUser(req, res));
export default router;
