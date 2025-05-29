import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/login.service';
import { PasswordValidator } from '../../shared/Validator/passwordValidator';
import { CommonModule } from '@angular/common';
import { AuthStore, User } from '../../store/auth.store';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
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
    authStore=inject(AuthStore);
    route=inject(Router);


    loginData = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    login() {
        // const isAuth = computed(() => AuthStore.isAuthenticated());
        // const isLoading = computed(() => AuthStore.isLoading());
        // const user = computed(() => AuthStore.user());
        if (this.loginData.valid) {
            this.authStore.setLoading(true);

            this.loginService.login(this.loginData.value).pipe().subscribe((res: any) => {
                if(res.result){
                    sessionStorage.setItem('token', res.token);
                    sessionStorage.setItem('user', JSON.stringify(res));
                    sessionStorage.setItem('refreshToken', res.refreshToken);
                    this.authStore.login(res?.data);
                    // this.route.navigate(['home'],{queryParams:{name:'Home'}}); 
                }else{
                    this.authStore.setLoading(false);
                    alert(res?.message||'Error occured');
                }
            })
        }

    }
}
