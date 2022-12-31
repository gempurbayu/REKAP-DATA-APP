export interface IAccountLoginValues {
    email: string;
    password: string;
}

export interface IAccountRegisterValues {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
}

export interface IAccountInfo {
    created_at: Date,
    email: string,
    email_verified_at: string,
    id: number,
    name: string,
    update_at: Date
}

export interface ILoginInfo {
    access_token: string;
    token_type: string,
    expires_in: number
}