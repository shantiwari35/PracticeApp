import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    apiUrl: string = environment.apiUrl2;
    constructor(private http: HttpClient) { }

    login(data:any) {
        const user = { EmailId: data.email, Password: data.password };
        return this.http.post(`${this.apiUrl}/api/JWT/login`, user);
    }
}
