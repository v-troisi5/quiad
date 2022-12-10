import { Sex } from "@prisma/client";

export class Node {

    public readonly id?: number;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly ownerId: number;
    public readonly sex?: Sex;

    public constructor(node: {
        id?: number,
        firstname?: string,
        lastname?: string,
        ownerId: number,
        sex?: Sex
    }) {
        this.id = node.id;
        this.firstname = node.firstname;
        this.lastname = node.lastname;
        this.ownerId = node.ownerId;
        this.sex = node.sex;
    }

}

export class InsertionNode {

    

}