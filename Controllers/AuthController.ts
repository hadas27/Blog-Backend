// Controllers/AuthController.ts
import { Request, Response } from 'express';
import { AuthBL } from '../BL/AuthBL';

export class AuthController {
    private authBL: AuthBL;

    constructor(authBL: AuthBL) {
        this.authBL = authBL;
    }

    async findUser(req: Request, res: Response): Promise<void> {
        const user = await this.authBL.findUser();
        res.json({ user: user, sessionToken: 'false_token' });
    }

}
