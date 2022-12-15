import { IAccount } from "./IAccount";


export class Account implements IAccount {

    public readonly id?: number;

    public constructor(account: IAccount) {
        this.id = account.id;
    }

}