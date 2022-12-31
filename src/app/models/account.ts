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
    email: string;
    name: string;
    token: string;
}