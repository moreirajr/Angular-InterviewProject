import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { environment } from '@environments/environment';
import { UserAuthentication } from '@app/_models/userauthentication';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private emptyUser = new UserAuthentication('');
    
    private currentUserSubject: BehaviorSubject<UserAuthentication>;
    public currentUser: Observable<UserAuthentication>;

    constructor(private http: HttpClient, @Inject(LOCAL_STORAGE) private storage: StorageService) {
        
        if(!this.storage.has('currentUser')){
            this.storage.set('currentUser', JSON.stringify(this.emptyUser));        
        }

        this.currentUserSubject = new BehaviorSubject<UserAuthentication>(
           this.storage.get('currentUser'));
            
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserAuthentication {
        return this.currentUserSubject.value;
    }

    private HttpOptions(username: string, password: string): HttpHeaders {
        let headers = new HttpHeaders();
        
        headers.set('Content-Type',  'application/json');
        headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        return headers;
    };

    login(username: string, password: string) {

        return this.http.post<any>(`${environment.authUrl}`, null, 
            {
                headers: this.HttpOptions(username, password)
            })
            .pipe(map(data => {
                console.log(data);
                
                let user = new UserAuthentication(window.btoa(username + ':' + password));
                localStorage.setItem('currentUser', JSON.stringify(user));

                console.log(this.currentUserSubject);
                this.currentUserSubject.next(user);
                console.log(this.currentUserSubject);

                return user;
            }));
    }

    logout() {
        console.log('logout');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(this.emptyUser);
    }
}