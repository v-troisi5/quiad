import { PrismaClient } from "@prisma/client";
import express, { Express } from "express";

const prisma = new PrismaClient();

(async () => {
    const nodo = await prisma.node.findFirst({
        where: {
            FatherHasChildren: undefined,
            AND: {
                MotherHasChildren: undefined,
            }
        },
        include: {
            father: true,
        }
    });
    console.log(nodo);
})();