
import { prismaMock } from '../../utils/singleton'
import { NodeController } from './node.controller';


describe("Node Controller", () => {
    const nodeController = new NodeController();
    
    it("Should find a list of nodes filtered by owner", () => {
        prismaMock.node.findMany.mockResolvedValue([
            {
                id: 2,
                firstname: "Mario",
                lastname: "Rossi",
                birthdate: new Date("1990-02-01"),
                birthplace: "Salerno",
                ownerId: 1,
                sex: "MALE",
                deathdate: null,
                deathplace: null,
                motherId: null,
                fatherId: null
            }
        ]);
        return nodeController
            .getNodes(1)
            .then(nodes => {
                nodes.forEach(node => {
                    expect(node.ownerId).toBe(1);
                })
            });
    });

    it("Should create a node", () => {
        prismaMock.node.create.mockResolvedValue(
            {
                id: 2,
                firstname: "Mario",
                lastname: "Rossi",
                birthdate: new Date("1990-02-01"),
                birthplace: "Salerno",
                ownerId: 1,
                sex: "MALE",
                deathdate: null,
                deathplace: null,
                motherId: null,
                fatherId: null
            }
        );
        return nodeController
            .createNode({
                    id: 2,
                    firstname: "Mario",
                    lastname: "Rossi",
                    birthdate: new Date("1990-02-01"),
                    birthplace: "Salerno",
                    ownerId: 1,
                    sex: "MALE"
            })
            .then(node => {
                expect(node).toBeDefined();
            });
    });
    
    it("Should update a node", () => {
        prismaMock.node.update.mockResolvedValue({
                id: 2,
                firstname: "Luigi",
                lastname: "Rossi",
                birthdate: new Date("1990-02-01"),
                birthplace: "Giffoni",
                ownerId: 1,
                sex: "MALE",
                deathdate: null,
                deathplace: null,
                motherId: null,
                fatherId: null
        });
        const updates: any = {
            firstname: "Luigi",
            birthplace: "Giffoni"
        }
        return nodeController
            .updateNode(2, updates).then(node => {
                expect(node.firstname).toBe(updates.firstname);
                expect(node.birthplace).toBe(updates.birthplace);
            })
    });

    it("Should delete a node", () => {
        prismaMock.node.delete.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Giffoni",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null
        });
        return nodeController
            .deleteNode(1)
            .then(nodes => {
                expect(nodes).toBeDefined();
            });
    });

    it("Should bind a document to a node", () => {
        prismaMock.node.update.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Giffoni",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null,
            documents: [
                {
                    id: 3
                },
                {
                    id: 4
                }
            ]
        } as any);
        return nodeController
            .bindDocument(2, 3)
            .then(node => {
                expect(node.documents?.find(d => d.id == 3)).toBeDefined();
            })
    });

    it("Should unbind a document from a node", () => {
        prismaMock.document.findUnique.mockResolvedValue({
            id: 2,
        } as any);
        prismaMock.node.update.mockResolvedValue({
            id: 2,
            firstname: "Luigi",
            lastname: "Rossi",
            birthdate: new Date("1990-02-01"),
            birthplace: "Giffoni",
            ownerId: 1,
            sex: "MALE",
            deathdate: null,
            deathplace: null,
            motherId: null,
            fatherId: null,
            documents: [
                {
                    id: 3
                },
            ]
        } as any);
        return nodeController
            .unbindDocument(2, 4)
            .then(node => {
                expect(node.documents?.find(d => d.id == 4)).toBeUndefined();
            })
    });

})
