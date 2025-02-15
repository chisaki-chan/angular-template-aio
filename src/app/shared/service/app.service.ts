import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
import Swal from 'sweetalert2';
import { FormGroup, Validators } from '@angular/forms';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';
import axios from 'axios';

@Injectable()
export class AppService {
  private apiUrl = `${environment.apiUrl}/user`;
  public interval = [];
  private Token: any;
  private httpOption: any;
  constructor(protected http: HttpClient, protected router: Router, public datepipe: DatePipe) {
    let sessionToken = PersistenceStorage.token.get();
    if (sessionToken) {
      this.Token = sessionToken;
    } else {
      this.Token = '';
    }

    this.httpOption = {
      Authorization: `Bearer ${this.Token}`,
      'Content-Type': 'application/json',
    };
  }

  //CRUD User
  async getUsers() {
    const response = await axios.get(`${this.apiUrl}/`);
    return response.data.data;
  }

  async getUserById(id: string) {
    const response = await axios.get(`${this.apiUrl}/${id}`);
    return response.data.data;
  }

  async createUser(user: any) {
    const response = await axios.post(`${this.apiUrl}/`, user);
    return response.data;
  }

  async updateUser(id: string, user: any) {
    const response = await axios.put(`${this.apiUrl}/${id}`, user);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await axios.delete(`${this.apiUrl}/${id}`);
    return response.data;
  }

  // HTTP Method
  get(url: any): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + url, {
        headers: this.httpOption,
      })
      .pipe(catchError(this.handleError));
  }

  getFile(url: string): Observable<Blob> {
    return this.http.get(environment.fileUrl + url, { responseType: 'blob' });
  }

  getFileProject(url: string): Observable<Blob> {
    return this.http
      .get<any>(environment.apiUrl + url, {
        headers: this.httpOption,
      })
      .pipe(catchError(this.handleError));
  }

  post(url: any, data: any): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + url, data, {
        headers: this.httpOption,
      })
      .pipe(catchError(this.handleError));
  }

  postFile(url: any, data: any): Observable<any> {
    return this.http
      .post(environment.apiUrl + url, data, this.httpOption)
      .pipe(catchError(this.handleError));
  }

  put(url: any, data: any): Observable<any> {
    return this.http
      .put<any>(environment.apiUrl + url, data, {
        headers: this.httpOption,
      })
      .pipe(catchError(this.handleError));
  }

  delete(url: any): Observable<any> {
    return this.http
      .delete(environment.apiUrl + url, {
        headers: this.httpOption,
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // End HTTP Method
  getAutoComplete(url: any, term: any): Observable<any> {
    if (term == '' || term == null) {
      term = '0';
    }
    return this.http
      .get<any>(environment.apiUrl + url + '/' + term, {
        headers: this.httpOption,
      })
      .pipe(catchError(this.handleError));
  }

  getAutoCompleteEmployee(term: any): Observable<any> {
    if (term == '' || term == null) {
      term = '0';
    }
    return this.http
      .get<any>(environment.apiUrl + '/master/autocomplete-employee/' + term, {
        headers: this.httpOption,
      })
      .pipe(catchError(this.handleError));
  }

  // Sweet Alert
  successMessage(title: any, body: any) {
    Swal.fire({
      title: title,
      text: body,
      icon: 'success',
    });
  }

  errorMessage(title: any, body: any) {
    Swal.fire({
      title: title,
      text: body,
      icon: 'error',
    });
  }

  warningMessage(title: any, body: any) {
    Swal.fire({
      title: title,
      text: body,
      icon: 'warning',
    });
  }
  // End Sweet Alert

  checkAvailabilityAuthorization(username: any) {
    return this.http.get(environment.apiUrl + '/master/authorization-by-code/' + username, {
      headers: this.httpOption,
    });
  }

  checkAvailabilityProduct(code: any) {
    return this.http.get(environment.apiUrl + `/master/products/code/${code}`, {
      headers: this.httpOption,
    });
  }
  checkAvailabilityLine(line_code: any, plant_code: any) {
    return this.http.get(environment.apiUrl + `/master/lines/code/${line_code}/${plant_code}`, {
      headers: this.httpOption,
    });
  }

  url(): string {
    console.log(environment.apiUrl);
    return environment.apiUrl;
  }

  userRole(role: any) {
    if (role == 1) {
      return 'SUPERADMIN';
    } else if (role == 2) {
      return 'ADMIN';
    } else if (role == 3) {
      return 'USER';
    } else {
      return 'UNASSIGNED ROLE';
    }
  }

  assignRole(role: any) {
    if (role == '1') {
      return '<span class="badge rounded-pill text-bg-primary">Superadmin</span>';
    } else if (role == '2') {
      return '<span class="badge rounded-pill text-bg-secondary">Admin</span>';
    } else if (role == '3') {
      return '<span class="badge rounded-pill text-bg-success">User</span>';
    } else {
      return 'Unassign Role';
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  formatDate(date: any) {
    if (date != '' && date != null && date != undefined) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      return [day, month, year].join('-');
    } else {
      return '-';
    }
  }

  formatDateTime(date: any) {
    if (date != '' && date != null && date != undefined) {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();

      // Ensure leading zeros if needed
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (hours.length < 2) hours = '0' + hours;
      if (minutes.length < 2) minutes = '0' + minutes;
      if (seconds.length < 2) seconds = '0' + seconds;

      // Format the date and time
      return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
    } else {
      return '-';
    }
  }

  formatFileSize(bytes: number): string {
    const KB = 1024;
    const MB = KB * 1024;
    const GB = MB * 1024;
    const TB = GB * 1024;

    if (bytes >= TB) {
      return (bytes / TB).toFixed(2) + ' TB';
    } else if (bytes >= GB) {
      return (bytes / GB).toFixed(2) + ' GB';
    } else if (bytes >= MB) {
      return (bytes / MB).toFixed(2) + ' MB';
    } else if (bytes >= KB) {
      return (bytes / KB).toFixed(2) + ' KB';
    } else {
      return bytes + ' Bytes';
    }
  }

  timeAgo(date: any) {
    if (date) {
      const now = new Date();
      const selectedDate = typeof date === 'string' ? new Date(date) : date; // Pastikan date adalah tipe Date
      const diffInSeconds = Math.floor((now.getTime() - selectedDate.getTime()) / 1000); // Pastikan hasilnya number

      const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
        { name: 'second', seconds: 1 },
      ];

      for (const unit of units) {
        const amount = Math.floor(diffInSeconds / unit.seconds);
        if (amount >= 1) {
          return amount + ' ' + unit.name + (amount > 1 ? 's' : '') + ' ago';
        }
      }

      return 'just now';
    } else {
      return null;
    }
  }

  timeAgoProject(date: any) {
    if (date) {
      const now = new Date();
      const selectedDate = typeof date === 'string' ? new Date(date) : date; // Pastikan date adalah tipe Date
      const diffInSeconds = Math.floor((now.getTime() - selectedDate.getTime()) / 1000); // Pastikan hasilnya number

      const units = [
        { name: 'year', seconds: 31536000 },
        { name: 'month', seconds: 2592000 },
        { name: 'day', seconds: 86400 },
        { name: 'hour', seconds: 3600 },
        { name: 'minute', seconds: 60 },
      ];

      let remainingSeconds = diffInSeconds;
      const result = [];

      for (const unit of units) {
        const amount = Math.floor(remainingSeconds / unit.seconds);
        if (amount >= 1) {
          result.push(amount + ' ' + unit.name + (amount > 1 ? 's' : ''));
          remainingSeconds -= amount * unit.seconds;
        }
      }

      return result.join(', ');
    } else {
      return null;
    }
  }

  getFirstAndLastInitials(name: any) {
    const words = name.split(' '); // Split the name into words

    if (words.length === 1) {
      // If there's only one word, return the first letter
      return words[0][0].toUpperCase();
    } else {
      // Otherwise, return the first and last initials
      const firstInitial = words[0][0].toUpperCase();
      const lastInitial = words[words.length - 1][0]?.toUpperCase();
      return firstInitial + lastInitial;
    }
  }

  formatStatusProject(status: any) {
    switch (status) {
      case 1:
        return `<span class="badge bg-dark-subtle text-dark">Backlog</span>`;
      case 2:
        return `<span class="badge bg-danger-subtle text-danger">To Plan</span>`;
      case 3:
        return `<span class="badge bg-warning-subtle text-warning">Pending</span>`;
      case 4:
        return `<span class="badge bg-info-subtle text-info">Processing</span>`;
      case 5:
        return `<span class="badge bg-success-subtle text-success">Closed</span>`;
      case 6:
        return `<span class="badge bg-success-subtle text-success">Finished</span>`;
      default:
        return '-';
    }
  }

  clearValidatorsForFields(form: FormGroup, fields: string[]) {
    fields.forEach((field) => {
      const control = form.get(field);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  enableRequiredValidatorsForFields(form: FormGroup, fields: string[]) {
    fields.forEach((field) => {
      const control = form.get(field);
      if (control) {
        control.setValidators(Validators.required);
        control.updateValueAndValidity();
      }
    });
  }

  fetchPromise = async (url: string, requestInit?: RequestInit) => {
    const response = await fetch(environment.apiUrl + url, {
      ...requestInit,
      headers: { ...this.httpOption, ...(requestInit?.headers || {}) },
    });
    // if (!response.ok) {
    //   throw new Error(response.statusText);
    // }
    return response.json();
  };
}
