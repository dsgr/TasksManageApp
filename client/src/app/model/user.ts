import {Authority} from "./authority";
export class User {
    id: number;
    username: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    mail: string;
    authorities: Authority[];
    token: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }


}
