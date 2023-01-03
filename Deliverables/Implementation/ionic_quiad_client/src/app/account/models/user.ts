import { INode, Node } from "src/app/tree/models/node";

export interface IUser {

    id: number;
    residence: string;
    role: any;
    node: INode;

}

export class User implements IUser {

    public readonly id: number;
    public readonly residence: string;
    public readonly node: Node;
    public readonly role: any;
    public readonly tree: Set<Node> = new Set();

    public constructor(user: IUser) {
        this.id = user.id;
        this.residence = user.residence;
        this.node = new Node(user.node);
    }

    public addNode(node: Node) {
        this.tree.add(node);
    }

    public getNodes() {
        return this.tree;
    }

    public modifyNode(id: number, modifiedNode: Node) {
        if(this.node.fatherId == id) {
            this.node.father!.firstname = modifiedNode.firstname;
            this.node.father!.lastname = modifiedNode.lastname;
        }
        if(this.node.motherId == id) {
            this.node.mother!.firstname = modifiedNode.firstname;
            this.node.mother!.lastname = modifiedNode.lastname;
        }
        for(const node of this.tree) {
            if(node.id == id) {
                node.firstname = modifiedNode.firstname ?? node.firstname;
                node.lastname = modifiedNode.lastname ?? node.lastname;
                node.birthdate = modifiedNode.birthdate;
                node.birthplace = modifiedNode.birthplace ?? node.birthplace;
                node.deathdate = modifiedNode.deathdate;
                node.deathplace = modifiedNode.deathplace ?? node.deathplace;
                node.motherId = modifiedNode.motherId ?? node.motherId;
                node.fatherId = modifiedNode.fatherId ?? node.fatherId;
            }
            if(node.fatherId == id) {
                node.father!.firstname = modifiedNode.firstname;
                node.father!.lastname = modifiedNode.lastname;
            }
            if(node.motherId == id) {
                node.mother!.firstname = modifiedNode.firstname;
                node.mother!.lastname = modifiedNode.lastname;
            }
        }
    }

    public deleteNode(id: number) {
        for(const node of this.tree) {
            if(node.id == id) {
                this.tree.delete(node);
                if(this.node.fatherId == id) {
                    this.node.fatherId = undefined;
                    return;
                } else if(this.node.motherId == id) {
                    this.node.motherId = undefined;
                    return;
                }
                for(const node of this.tree) {
                    if(node.fatherId == id) {
                        node.fatherId = undefined;
                    } else if(node.motherId == id) {
                        node.motherId = undefined;
                    }
                }
                return;
            }
        }
        throw new Error("Tree doesn't contain a node with id " + id);
    }

}
