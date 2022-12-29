
export interface IAccount {

    id: number;
    username: string;

}

export class Account implements IAccount {

    public readonly id: number;
    public readonly username: string;

    public constructor(account: IAccount) {
        this.id = account.id;
        this.username = account.username;
    }

}