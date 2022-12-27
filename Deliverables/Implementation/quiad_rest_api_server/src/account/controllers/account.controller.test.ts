
import { prismaMock } from '../../utils/singleton'
import { AccountController } from './account.controller';

const accountController = new AccountController();

it("Should retrieve an existing username", () => {
    prismaMock.account.findUnique.mockResolvedValue({
        id: 1,
        email: "test@quiad.net",
        username: "quiad",
        password: "test_non_hashed_password"
    });
    return accountController
        .findByUsername("quiad")
        .then(account => {
                expect(account.username).toBe("quiad");
            });
});

it("Should not retrieve an existing username", () => {
    return accountController
        .findByUsername("quiadz")
        .then(account => {
                expect(account).toBeUndefined();
            });
});

it("Should create an account", () => {
    prismaMock.account.create.mockResolvedValue({
        "id": 2,
        "email": "test@quiad.com",
        "username": "quiad",
        "password": "miapassword",
        "user": {
            "id": 1,
            "role": {
                "id": 1,
                "name": "standard"
            },
            "node": {
                "id": 1,
                "firstname": "Mario",
                "lastname": "Rossi",
                "birthdate": null,
                "birthplace": "Salerno",
                "sex": "MALE"
            }
        }
    } as any);
    return accountController
        .createAccount({
            "username": "quiad",
            "email": "quiad@test.com",
            "password": "miapassword",
            "user": {
                "residence": "Via Marco Polo, 17",
                "node": {
                    "firstname": "Mario",
                    "lastname": "Rossi",
                    "birthplace": null,
                    "birtdate": "2022-02-01 00:00:00",
                    "sex": "MALE"
                }
            }
        }).then(account => {
            expect(account).toBeDefined();
            expect(account.user?.role?.name).toBe("standard");
        });
});