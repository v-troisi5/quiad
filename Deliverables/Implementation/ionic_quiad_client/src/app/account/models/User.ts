import { IUser } from "./IUser";
import { Node } from "./Node";

export class User implements IUser {

    public readonly id?: number;
    public readonly residence?: string;
    public readonly node?: Node;

    public constructor(user?: IUser) {
        this.id = user?.id;
        this.residence = user?.residence;
        this.node = user?.node;
    }

}