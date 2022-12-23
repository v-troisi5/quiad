import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { AccountRoute } from "./account";
import { TreeRoute } from "./tree";
import { DocumentRoute } from "./document";

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(morgan("dev"));

app.use("/", new AccountRoute().app);
app.use("/nodes", new TreeRoute().app);
app.use("/documents", new DocumentRoute().app);

app.use((req, res, next) => {
    res.status(404).json(null)
});

app.listen(80, () => {
    console.info(`Server is running on port ${80}`);
});