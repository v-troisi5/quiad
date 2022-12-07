import { Route } from "../../utils/Route";
import { TreeService } from "../services/tree.service";

export class TreeRoute extends Route {

    private treeService = new TreeService();

    constructor() {
        super();
        this.app.post("/node", (req, res, next) => {
            return this.treeService.createNode(req, res, next);
        })
    }

}