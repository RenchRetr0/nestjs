export interface IReadableUser {
    readonly login: string;
    readonly email: string;
    readonly age: number;
    accessToken?: string;
}