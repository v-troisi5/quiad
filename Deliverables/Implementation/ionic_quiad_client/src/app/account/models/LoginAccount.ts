import { Account } from "./Account";
import { ILoginAccount } from "./ILoginAccount";

export class LoginAccount implements ILoginAccount {

    public readonly account: Account;
    public readonly token: string;

    public constructor(loginAccount: ILoginAccount) {
        this.account = loginAccount.account;
        this.token = loginAccount.token;
    }

}