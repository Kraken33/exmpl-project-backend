// @ts-ignore
declare global {
    namespace Express {
        // tslint:disable-next-line:no-empty-interface
        interface AuthInfo {}
        interface User {
            id: number;
        }

        interface Request {
            authInfo?: AuthInfo;
            user?: User;

            // These declarations are merged into express's Request type
            login(user: User, done: (err: any) => void): void;
            login(user: User, options: any, done: (err: any) => void): void;
            logIn(user: User, done: (err: any) => void): void;
            logIn(user: User, options: any, done: (err: any) => void): void;

            logout(): void;
            logOut(): void;

            isAuthenticated(): boolean;
            isUnauthenticated(): boolean;
        }
    }
}