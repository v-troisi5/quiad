import express, { Express } from "express";

export abstract class Route {

    public readonly app: Express = express();

}