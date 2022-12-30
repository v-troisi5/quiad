import { INode, Node } from "src/app/tree/models/node";

export interface IUser {

    id: number;
    node: INode;

}

export class User implements IUser {

    public readonly id: number;
    public readonly node: Node;
    public readonly tree: Set<Node> = new Set();

    public constructor(user: IUser) {
        this.id = user.id;
        this.node = new Node(user.node);
    }

    public addNode(node: Node) {
        this.tree.add(node);
    }

}
