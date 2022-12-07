import { NextFunction, Request, Response } from "express";
import { NodeController } from "../controllers/node.controller";
import { Node } from "../models/Node";

export class TreeService {

    private nodeController = new NodeController();

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

}
