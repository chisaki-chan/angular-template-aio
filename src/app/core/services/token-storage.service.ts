import { Injectable } from '@angular/core';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private user = PersistenceStorage.user.get();

  constructor() {}

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    PersistenceStorage.token.set(token);
  }

  public getToken(): string | null {
    return PersistenceStorage.token.get();
  }

  public saveUser(user: any): void {
    PersistenceStorage.user.set(user);
  }

  public getUser(): any {
    if (this.user) {
      return this.user;
    }

    return {};
  }

  public getEmployeeCode(): any {
    if (this.user) {
      return this.user.nik;
    }

    return {};
  }

  public getDepartment(): any {
    if (this.user) {
      return this.user.department;
    }

    return {};
  }

  public getDepartmentName(): any {
    if (this.user) {
      return this.user.department_name;
    }

    return {};
  }

  public getRole(): any {
    if (this.user) {
      return this.user.role;
    }

    return '';
  }

  public getGroup(): any {
    if (this.user) {
      return this.user.group;
    }

    return {};
  }
}
