import { Node } from "src/app/tree/models/node";
import { User } from "./user";

describe('User', () => {
    let user: User;

    beforeEach(() => {
        user = new User({
            id: 1,
            residence: "Via G. Verdi, 22",
            node: {
                id: 1,
                firstname: "Pasquale",
                lastname: "Cafiero",
                birthdate: new Date("1953-11-09").toString(),
                birthplace: "Poggioreale",
                sex: "MALE"
            }
        });
    });

    it("Should be created", () => {
        expect(user).toBeDefined();
    });

    it("Should insert a node in the user tree", () => {
        const nodes = new Set<Node>();
        const node = new Node({
            id: 2,
        });
        nodes.add(node);
        user.addNode(node);
        expect(user.getNodes()).toEqual(nodes);
    });
    
    it("Should modify a certain node in the user tree", () => {
        const node = new Node({
            id: 2,
        });
        user.addNode(node);
        user.modifyNode(2, new Node({
            id: 2,
            firstname: "Gennaro"
         }));
        for(const node of user.tree) {
            if(node.id == 2) {
                expect(node.firstname).toBe("Gennaro");
            }
        }
    });

    it("Should delete a certain node in the user tree", () => {
        const node = new Node({
            id: 2,
        });
        user.addNode(node);
        user.deleteNode(2);
        expect(user.tree.has(node)).toBeFalse();
    });

});