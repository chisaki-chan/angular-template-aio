import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { Store } from '@ngrx/store';
import { loginFailure } from 'src/app/store/Authentication/authentication.actions';
import { environment } from 'src/environments/environment';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {
  user!: User;
  currentUserValue: any;

  private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(private http: HttpClient, private store: Store) {
    const user = PersistenceStorage.user.get();
    this.currentUserSubject = new BehaviorSubject<User>(user as any);
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, first_name: string, password: string) {
    // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
    //     const user = response;
    //     return user;
    // });

    // Register Api
    return this.http
      .post(
        AUTH_API + 'signup',
        {
          email,
          first_name,
          password,
        },
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const user = response;
          return user;
        }),
        catchError((error: any) => {
          const errorMessage = 'Login failed'; // Customize the error message as needed
          this.store.dispatch(loginFailure({ error: errorMessage }));
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(username: string, password: string, company: string) {
    // return getFirebaseBackend()!.loginUser(username, password).then((response: any) => {
    //     const user = response;
    //     return user;
    // });

    return this.http
      .post(
        AUTH_API + 'login',
        {
          username,
          password,
          company,
        },
        httpOptions
      )
      .pipe(
        map((response: any) => {
          const user = response;
          return user;
        }),
        catchError((error: any) => {
          const errorMessage = 'Login failed'; // Customize the error message as needed
          return throwError(errorMessage);
        })
      );
  }

  /**
   * Returns the current user
   */
  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }

  /**
   * Logout the user
   */
  logout() {
    PersistenceStorage.token.remove();
    PersistenceStorage.user.remove();

    return true;
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }

  loginApps(username: string, token: string) {
    return this.http.get(environment.apiUrl + '/master/authorization-by-code/' + username, {
      headers: new HttpHeaders({
        authorization: token,
        'Content-Type': 'application/json',
      }),
    });
  }
}
