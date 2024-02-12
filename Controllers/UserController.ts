import { Request, Response } from 'express';
import { UserBL } from "../BL/UserBl";
import User from "../models/User";



export class UserController {
    private userBL: UserBL;

    constructor(userBL: UserBL) {
        this.userBL = userBL;
    }


    async addUser(req: Request, res: Response): Promise<void> {
        const userData = req.body;
        const user = new User(userData.id, userData.firstName, userData.lastName);
        try {
            await this.userBL.addUser(user);
            res.status(201).send({ message: `User created successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const userId = +req.params.id;
        try {
            const user = await this.userBL.getUser(userId);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }


    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userBL.fetchUsers();
            // const formattedPosts = posts.map(post => ({ id: post.id, title: post.title }));

            res.json(users);
        }
        catch (error) {
            res.status(400).send((error as Error).message);
        }
    }



    async updateUser(req: Request, res: Response): Promise<void> {
        const userId = +req.params.id;
        const userData = req.body;
        try {
            await this.userBL.updateUser(userId, userData);
            res.status(200).send({ message: `User ${userId} updated successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = +req.params.id;
        try {
            await this.userBL.deleteUser(userId);
            res.status(200).send({ message: `User ${userId} deleted successfully` });
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }
}