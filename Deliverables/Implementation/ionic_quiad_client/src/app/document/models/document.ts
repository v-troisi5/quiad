
export interface IDocument {

    id: number;
    name?: string;
    retrievalDate?: string | Date;
    originDate?: string | Date;
    retrievalPlace?: string;
    originPlace?: string;
    categoryId?: number

}

export class Document implements IDocument {

    public readonly id: number;
    public readonly name?: string;
    public readonly retrievalDate?: Date;
    public readonly originDate?: Date;
    public readonly retrievalPlace?: string;
    public readonly originPlace?: string;
    public readonly categoryId?: number;

    public constructor(document: IDocument) {
        this.id = document.id;
        this.name = document.name;
        this.retrievalDate = document.retrievalDate ? new Date(document.retrievalDate) : undefined;
        this.originDate = document.originDate ? new Date(document.originDate) : undefined;
        this.retrievalPlace = document.retrievalPlace;
        this.originPlace = document.originPlace;
        this.categoryId = document.categoryId;
    }

}