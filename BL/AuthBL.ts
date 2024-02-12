import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserDataAccess } from '../DAL/UserDataAccess';
import User from '../models/User';

export class AuthBL {
    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    async findUser(): Promise<User> {
        const randomId = Math.floor(Math.random() * 3) + 2
        return await this.userDataAccess.get(randomId)
    }
}




