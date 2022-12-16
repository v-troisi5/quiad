import { IUser } from "./IUser";

export interface IAccount {

    id?: number;
    email?: string;
    username?: string;
    password?: string;
    token?: string;
    user?: IUser;

}