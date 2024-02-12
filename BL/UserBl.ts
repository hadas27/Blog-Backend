import { UserDataAccess } from "../DAL/UserDataAccess";
import User from "../models/User";


export class UserBL {
    private userDataAccess: UserDataAccess;

    constructor(userDataAccess: UserDataAccess) {
        this.userDataAccess = userDataAccess;
    }

    addUser(user: User): void {
        try {
            this.userDataAccess.add(user);
        } catch (error) {
            throw new Error(`Unable to add user: ${(error as Error).message}`);
        }
    }

    async getUser(userId: number): Promise<User> {
        const user = await this.userDataAccess.get(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return user;
    }

    fetchUsers() {
        const Users = this.userDataAccess.fetch();

        if (!Users) {
            throw new Error("userss not found");
        }

        return Users;
    }


    updateUser(userId: number, updateData: Partial<User>): void {
        try {
            this.userDataAccess.update(userId, updateData);
        } catch (error) {
            throw new Error(`Unable to update user: ${(error as Error).message}`);
        }
    }

    deleteUser(userId: number): void {
        try {
            this.userDataAccess.delete(userId);
        } catch (error) {
            throw new Error(`Unable to delete user: ${(error as Error).message}`);
        }
    }
}