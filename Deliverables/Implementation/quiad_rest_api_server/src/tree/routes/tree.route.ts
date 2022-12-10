import { AuthMiddleware } from "../../account/middlewares/auth.middleware";
import { Route } from "../../utils/Route";
import { TreeService } from "../services/tree.service";

export class TreeRoute extends Route {

    private treeService = new TreeService();

    private authMiddleware = new AuthMiddleware();

    constructor() {
        super();
        this.app.post("/node", (req, res, next) => {
            return this.treeService.createNode(req, res, next);
        });
        this.app.patch("/node/:id", (req, res, next) => {
            return this.treeService.updateNode(req, res, next);
        });
        this.app.delete("/node/:id", (req, res, next) => {
            return this.treeService.updateNode(req, res, next);
        });
        this.app.get("/node/:owner", (req, res, next) => {
            return this.treeService.getNodes(req, res, next);
        });
        // TODO: Esporre binding documento
        // TODO: Esporre unbinding documento
    }

}