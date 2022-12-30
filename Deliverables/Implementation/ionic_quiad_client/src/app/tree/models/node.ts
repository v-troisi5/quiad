

export interface INode {

    id: number;
    firstname?: string;
    lastname?: string;
    sex?: "MALE" | "FEMALE";
    birthplace?: string;
    deathplace?: string;
    birthdate?: string | Date;
    deathdate?: string | Date;
    fatherId?: number;
    motherId?: number;

}

export class Node implements INode {

    public readonly id: number;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly sex?: "MALE" | "FEMALE";
    public readonly birthplace?: string;
    public readonly deathplace?: string;
    public readonly birthdate?: Date;
    public readonly deathdate?: Date;
    public readonly fatherId?: number;
    public readonly motherId?: number;

    public constructor(node: INode) {
        this.id = node.id;
        this.firstname = node.firstname;
        this.lastname = node.lastname;
        this.sex = node.sex;
        this.birthplace = node.birthplace;
        this.deathplace = node.deathplace;
        this.birthdate = node.birthdate ? new Date(node.birthdate) : undefined;
        this.deathdate = node.deathdate ? new Date(node.deathdate) : undefined;
        this.fatherId = node.fatherId;
        this.motherId = node.motherId;
    }

}