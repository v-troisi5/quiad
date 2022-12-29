
export interface IDocument {

    id: number;

}

export class Document implements IDocument {

    public readonly id: number;

    public constructor(document: IDocument) {
        this.id = document.id;
    }

}