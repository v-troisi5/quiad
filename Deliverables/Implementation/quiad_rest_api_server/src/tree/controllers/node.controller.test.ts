
import { prismaMock } from '../../utils/singleton'
import { NodeController } from './node.controller';

const nodeController = new NodeController();

it("Should find a list of existing nodes", () => {
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

it("Should find an empty list of nodes", () => {
    prismaMock.node.findMany.mockResolvedValue([]);
    return nodeController
        .getNodes(1)
        .then(nodes => {
            expect(nodes.length).toBe(0);
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
