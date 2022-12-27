import { Sex } from "@prisma/client";
import { Document } from "../../document/models/Document";

export class Node {

    public readonly id?: number;
    public readonly firstname?: string;
    public readonly lastname?: string;
    public readonly ownerId: number;
    public readonly birthplace?: string;
    public readonly deathplace?: string;
    public readonly birthdate?: Date | null;
    public readonly deathdate?: Date | null;
    public readonly sex?: Sex;
    public readonly fatherId?: number;
    public readonly motherId?: number;
    public readonly documents?: Document[];
    public readonly motherHasChildren?: { connect: { id: string }[] | { id: string } }
    public readonly fahterHasChildren?: { connect: { id: string }[] | { id: string } }

    public constructor(node: {
        id?: number,
        firstname?: string,
        lastname?: string,
        ownerId: number,
        fatherId?: number,
        motherId?: number,
        birthplace?: string;
        deathplace?: string;
        birthdate?: Date | null;
        deathdate?: Date | null;
        sex?: Sex,
        motherHasChildren?: { connect: { id: string }[] | { id: string } },
        fatherHasChildren?: { connect: { id: string }[] | { id: string } },
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
        this.birthdate = node.birthdate ? new Date(node.birthdate) : node.birthdate;
        this.deathdate = node.deathdate ? new Date(node.deathdate) : node.deathdate;
        this.motherHasChildren = node.motherHasChildren;
        this.fahterHasChildren = node.fatherHasChildren;
    }

}

export class InsertionNode {

    

}