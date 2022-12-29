import { INode, Node } from "src/app/tree/models/node";

export interface IUser {

    id: number;
    node: INode;

}

export class User implements IUser {

    public readonly id: number;
    public readonly node: Node;

    public constructor(user: IUser) {
        this.id = user.id;
        this.node = new Node(user.node);
    }

}
