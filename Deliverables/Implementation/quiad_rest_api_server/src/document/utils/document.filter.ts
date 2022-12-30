
export class DocumentFilter {

    public readonly retrievalDate?: Date;
    public readonly retrievalPlace?: string;
    public readonly originDate?: Date;
    public readonly originPlace?: string
    public readonly categoryId?: number;

    public constructor(documentFilter?: {
        retrievalDate?: Date,
        retrievalPlace?: string,
        originDate?: Date,
        originPlace?: string
        categoryId?: string;
    }) {
        this.retrievalDate = documentFilter?.retrievalDate ? new Date(documentFilter.retrievalDate!) : undefined;
        this.retrievalPlace = documentFilter?.retrievalPlace;
        this.originDate = documentFilter?.originDate ? new Date(documentFilter.originDate!) : undefined;
        this.originPlace = documentFilter?.originPlace;
        this.categoryId = documentFilter?.categoryId ? parseInt(documentFilter.categoryId) : undefined;
    }

}