import { NextFunction, Request, Response } from "express";
import { NodeController } from "../controllers/node.controller";
import { Node } from "../models/Node";

export class TreeService {

    private nodeController = new NodeController();

    public async getNodes(req: Request, res: Response, next: NextFunction) {
        const owner = parseInt(req.params.owner);
        const nodes = await this.nodeController.getNodes(owner);
        res.json(nodes);
    }

    public async createNode(req: Request, res: Response, next: NextFunction): Promise<void> {
        const node = new Node(req.body.node);
        // Verifica delle precodizioni nella costruzione dell'oggetto
        try {
            const insertedNode = await this.nodeController.createNode(node);
            res.json(insertedNode);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    public async updateNode(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = parseInt(req.params.id);
        const node = new Node(req.body.node);
        const updatedNode = await this.nodeController.updateNode(id, node);
        res.json(updatedNode);
    }

    public async deleteNode(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = parseInt(req.params.id);
        const deletedNode = await this.nodeController.deleteNode(id);
        res.json(deletedNode);
    }

    public async bindDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        const node =  parseInt(req.params.node);
        const document = parseInt(req.params.document);
        const bindedNode = await this.nodeController.bindDocument(node, document);
        res.json(bindedNode);
    }

    public async unbindDocument(req: Request, res: Response, next: NextFunction): Promise<void> {
        const node =  parseInt(req.params.node);
        const document = parseInt(req.params.document);
        const unbindedNode = await this.nodeController.unbindDocument(node, document);
        res.json(unbindedNode);
    }

}
