

export interface INode {

    id: number;

}

export class Node implements INode {

    public readonly id: number;

    public constructor(node: INode) {
        this.id = node.id;
    }

}