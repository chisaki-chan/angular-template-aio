import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor() {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);

    // Opsi untuk memformat tanggal
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };

    // Menggunakan toLocaleDateString untuk format
    return date.toLocaleDateString('en-US', options);
  }

  showLoader(): void {
    // create loader backdrop
    const loaderBackdrop = document.getElementById('loader-backdrop');

    if (!loaderBackdrop) return;

    loaderBackdrop.classList.remove('d-none');

    // add body class 'overflow-hidden'
    document.body.classList.add('overflow-hidden');
  }

  closeLoader(): void {
    // create loader backdrop
    const loaderBackdrop = document.getElementById('loader-backdrop');

    if (!loaderBackdrop) return;

    loaderBackdrop.classList.add('d-none');

    // remove body class 'overflow-hidden'
    document.body.classList.remove('overflow-hidden');
  }
}
