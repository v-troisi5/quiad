

export interface INode {

    id?: number;
    firstname?: string;
    lastname?: string;
    birthplace?: string;
    birthdate?: Date;
    fatherId?: number;
    motherId?: number;
    sex?: "MALE" | "FEMALE";

}