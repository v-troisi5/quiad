import { INode } from "./INode";

export class Node implements INode {

    public readonly id?: number;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly birthplace?: string;
    public readonly birthdate?: Date;
    public readonly fatherId?: number;
    public readonly motherId?: number;
    public readonly sex?: "MALE" | "FEMALE";

    public constructor(node?: INode) {
        this.id = node?.id;
        this.firstname = node?.firstname;
        this.lastname = node?.lastname;
        this.birthplace = node?.birthplace;
        this.birthdate = node?.birthdate;
        this.fatherId = node?.fatherId;
        this.motherId = node?.motherId;
        this.sex = node?.sex;
    }

}