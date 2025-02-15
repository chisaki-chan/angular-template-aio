import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/store/Authentication/auth.models';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        const user = PersistenceStorage.user.get();
        this.currentUserSubject = new BehaviorSubject<User>(user as any);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * current user
     */
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { email, password }).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {                    
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                sessionStorage.setItem('toast', 'true');
                PersistenceStorage.user.set(user);
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }

    /**
     * Logout the user
     */
    logout() {
        // remove user from local storage to log user out
        PersistenceStorage.user.remove();
        this.currentUserSubject.next(null!);
    }
}
