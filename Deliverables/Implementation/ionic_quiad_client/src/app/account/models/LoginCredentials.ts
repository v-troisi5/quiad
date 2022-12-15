
export class LoginCredentials {

    public readonly username: string;
    public readonly password: string;
    public readonly rememberMe: boolean;

    constructor(credentials: {
        username: string,
        password: string,
        rememberMe: boolean
    }) {
        this.username = credentials.username;
        this.password = credentials.password;
        this.rememberMe = credentials.rememberMe;
    }

}