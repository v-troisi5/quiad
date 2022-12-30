import { Document } from "src/app/document/models/document";


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
    public firstname?: string;
    public lastname?: string;
    public sex?: "MALE" | "FEMALE";
    public birthplace?: string;
    public deathplace?: string;
    public birthdate?: Date;
    public deathdate?: Date;
    public fatherId?: number;
    public motherId?: number;
    public documents: Set<Document> = new Set();

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

    public bindDocument(document: Document) {
        this.documents.add(document);
    }

    public unbindDocument(id: number) {
        for(const document of this.documents) {
            if(document.id == id) {
                this.documents.delete(document);
                return;
            }
        }
        throw new Error("Node doesn't contain a document with id " + id);
    }

}