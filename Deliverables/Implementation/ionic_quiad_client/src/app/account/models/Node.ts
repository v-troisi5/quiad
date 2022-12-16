import { INode } from "./INode";

export class Node implements INode {

    public readonly id?: number;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly birthplace?: string;
    public readonly birthdate?: Date;

    public constructor(node?: INode) {
        this.id = node?.id;
        this.firstname = node?.firstname;
        this.lastname = node?.lastname;
        this.birthplace = node?.birthplace;
        this.birthdate = node?.birthdate;
    }

}