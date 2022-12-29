import { IUser, User } from "./user";

export interface IAccount {

    id: number;
    username: string;
    user: IUser;

}

export class Account implements IAccount {

    public readonly id: number;
    public readonly username: string;
    public readonly user: User;

    public constructor(account: IAccount) {
        this.id = account.id;
        this.username = account.username;
        this.user = new User(account.user);
    }

}
