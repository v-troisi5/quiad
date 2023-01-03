import { Route } from "../../utils/Route";
import { AuthService } from "../services/auth.service";
import { RegistrationService } from "../services/registration.service";

export class AccountRoute extends Route {

    private authService = new AuthService();
    private registrationService = new RegistrationService();

    constructor() {
        super();
        this.app.post("/login", (req, res, next) => {
            return this.authService.login(req, res, next);
        });
        this.app.post("/register", (req, res, next) => {
            return this.registrationService.register(req, res, next);
        });
    }

}
