import { IAccount } from "./IAccount";
import { User } from "./User";


export class Account implements IAccount {

    public readonly id?: number;
    public readonly email?: string;
    public readonly username?: string;
    public readonly password?: string;
    public readonly token?: string;
    public readonly user?: User;

    public constructor(account: IAccount) {
        this.id = account.id;
        this.email = account.email;
        this.username = account.username;
        this.password = account.password;
        this.token = account.token;
        this.user = account.user ? new User(account.user) : undefined;
    }

}