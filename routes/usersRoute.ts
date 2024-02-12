import express, { Request, Response } from 'express';
import { UserController } from '../Controllers/UserController';
import { UserBL } from '../BL/UserBl';
import { UserDataAccess } from '../DAL/UserDataAccess';

const router = express.Router();
const userController = new UserController(new UserBL(new UserDataAccess()));

router.post('/', async (req: Request, res: Response) => await userController.addUser(req, res));
router.get('/', async (req: Request, res: Response) => await userController.getUsers(req, res));
router.get('/:id', async (req: Request, res: Response) => await userController.getUser(req, res));
router.put('/:id', async (req: Request, res: Response) => await userController.updateUser(req, res));
router.delete('/:id', async (req: Request, res: Response) => await userController.deleteUser(req, res));

export default router;