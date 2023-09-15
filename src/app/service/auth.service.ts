import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../dto/AuthRequest.class';
import { Observable, catchError, map, of } from 'rxjs';
import { AppSettings } from 'AppSetting';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private storageService: StorageService,
    ) { }

    login(LoginRequest: LoginRequest): Observable<any> {
        return this.http.post(AppSettings.API_ENDPOINT + ":" + AppSettings.PORT + "/api/v1/auth/login", LoginRequest)
            .pipe(map(
                (data) => {
                    let loginResponse = data as LoginResponse;
                    console.log(loginResponse);
                    this.storageService.saveToken(loginResponse);
                    return true;
                }
            ), catchError(
                (error) => {
                    this.storageService.signOut();
                    return of(false);
                }
            ));
    }
    logout(username: string | null, refresh: string | null): Observable<any> {
        this.storageService.signOut();
        return this.http.post(AppSettings.API_ENDPOINT + ":" + AppSettings.PORT + "/api/v1/auth/logout", {
            username: username, refreshToken: refresh
        });
    }

}