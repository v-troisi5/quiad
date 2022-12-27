import { Sex } from "@prisma/client";
import { Document } from "../../document/models/Document";

export class Node {

    public readonly id?: number;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly ownerId: number;
    public readonly birthplace?: string;
    public readonly deathplace?: string;
    public readonly birthdate?: Date;
    public readonly deathdate?: Date;
    public readonly sex?: Sex;
    public readonly fatherId?: number;
    public readonly motherId?: number;
    public readonly documents?: Document[];

    public constructor(node: {
        id?: number,
        firstname?: string,
        lastname?: string,
        ownerId: number,
        fatherId?: number,
        motherId?: number,
        birthplace?: string;
        deathplace?: string;
        birthdate?: Date;
        deathdate?: Date;
        sex?: Sex
    }) {
        this.id = node.id;
        this.firstname = node.firstname;
        this.lastname = node.lastname;
        this.ownerId = node.ownerId;
        this.fatherId = node.fatherId;
        this.motherId = node.motherId;
        this.sex = node.sex;
        this.birthplace = node.birthplace;
        this.deathplace = node.deathplace;
        this.birthdate = node.birthdate;
        this.deathdate = node.deathdate;
    }

}

export class InsertionNode {

    

}