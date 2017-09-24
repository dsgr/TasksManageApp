import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
    selector: 'registration-component',
    templateUrl: 'registration.component.html'
})
export class RegistrationComponent implements OnInit {
    registrationForm: FormGroup;
    loading: boolean = false;
    error: string = '';
    errorPassworsd: string;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.errorPassworsd = '';
        this.registrationForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            confirmPassword: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', Validators.required),
            mail: new FormControl(''),
        });
    }

    onSubmit() {
        if (this.registrationForm.value.password !== this.registrationForm.value.confirmPassword) {
            this.errorPassworsd = 'Введеные пороли не совпадают';
            return;
        }
        this.loading = true;
        const user = new User(this.registrationForm.value.username, this.registrationForm.value.password);
        user.firstName = this.registrationForm.value.firstName;
        user.lastName = this.registrationForm.value.lastName;
        user.phoneNumber = this.registrationForm.value.phoneNumber;
        user.mail = this.registrationForm.value.mail;
        this.userService.add(user).subscribe(
            result => {
                result && this.router.navigate(['/']);
            }, error => {
                this.error = <any>error;
                this.loading = false;
                this.errorPassworsd = '';
            }
        );
    }
}
