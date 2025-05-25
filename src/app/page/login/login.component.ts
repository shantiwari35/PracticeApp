import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/login.service';
import { PasswordValidator } from '../../shared/Validator/passwordValidator';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../store/auth.store';
export interface loginData {
    email: string;
    password: string;
}


@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

    loginService = inject(LoginService);



    loginData = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, PasswordValidator()]),
    });

    login() {
        const isAuth = computed(() => AuthStore.isAuthenticated());
        const isLoading = computed(() => AuthStore.isLoading());
        const user = computed(() => AuthStore.user());
        if (this.loginData.valid) {
            this.loginService.login(this.loginData.value).pipe().subscribe((res: any) => {
                sessionStorage.setItem('token', res.token);
                sessionStorage.setItem('user', JSON.stringify(res));
                sessionStorage.setItem('refreshToken', res.refreshToken);
                AuthStore.login(res);
            })
        }

    }
}
