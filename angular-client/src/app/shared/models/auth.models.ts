export class UserIdentity {
    username: string;
    isAuthenticated: boolean;
    authenticationType: string
}

export class LoginCredential {
    username: string;
    password: string;
}

export class UserInfo {
    "preferred_username": string;
    "given_name": string;
    "family_name": string;
    "email": string;

    get full_name(): string {
        return this.given_name + ' ' + this.family_name;
    }
}

export class AccessToken {
    access_token: string;
    expires_in: number;
    token_type: string;
}