import { AuthMiddleware } from "../../account/middlewares/auth.middleware";
import { Route } from "../../utils/Route";
import { TreeService } from "../services/tree.service";

export class TreeRoute extends Route {

    private treeService = new TreeService();

    private authMiddleware = new AuthMiddleware();

    constructor() {
        super();
        this.app.post("/", this.authMiddleware.filter("node:create"), (req, res, next) => {
            return this.treeService.createNode(req, res, next);
        });
        this.app.patch("/:id", this.authMiddleware.filter("node:update"), (req, res, next) => {
            return this.treeService.updateNode(req, res, next);
        });
        this.app.delete("/:id", this.authMiddleware.filter("node:delete"), (req, res, next) => {
            return this.treeService.deleteNode(req, res, next);
        });
        this.app.get("/:owner", this.authMiddleware.filter("node:read"), (req, res, next) => {
            return this.treeService.getNodes(req, res, next);
        });
        // TODO: Esporre binding documento
        // TODO: Esporre unbinding documento
    }

}