import { INode, Node } from "src/app/tree/models/node";

export interface IUser {

    id: number;
    residence: string;
    role: any;
    node: INode;

}

export class User implements IUser {

    public readonly id: number;
    private _residence: string;
    public readonly node: Node;
    public readonly role: any;
    public readonly tree: Set<Node> = new Set();

    public constructor(user: IUser) {
        this.id = user.id;
        this._residence = user.residence;
        this.node = new Node(user.node);
    }

    public get residence() {
        return this._residence;
    }

    public set residence(residence: string) {
        this._residence = residence;
    }

    public addNode(node: Node) {
        this.tree.add(node);
    }

    public getNodes() {
        return this.tree;
    }

    public modifyNode(id: number, modifiedNode: Node) {
        for(const node of this.tree) {
            if(node.id == id) {
                node.firstname = modifiedNode.firstname ?? node.firstname;
                node.lastname = modifiedNode.lastname ?? node.lastname;
                node.birthdate = modifiedNode.birthdate ?? node.birthdate;
                node.birthplace = modifiedNode.birthplace ?? node.birthplace;
                node.deathdate = modifiedNode.deathdate ?? node.deathdate;
                node.deathplace = modifiedNode.deathplace ?? node.deathplace;
                node.motherId = modifiedNode.motherId ?? node.motherId;
                node.fatherId = modifiedNode.fatherId ?? node.fatherId;
                return;
            }
        }
        throw new Error("Tree doesn't contain a node with id " + id);
    }

    public deleteNode(id: number) {
        for(const node of this.tree) {
            if(node.id == id) {
                this.tree.delete(node);
                return;
            }
        }
        throw new Error("Tree doesn't contain a node with id " + id);
    }

}
