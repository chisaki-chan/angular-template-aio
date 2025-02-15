import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// Login Auth
import { AuthenticationService } from '../../core/services/auth.service';
import { ToastService } from './toast-service';
import { AppService } from 'src/app/shared/service/app.service';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';
import { MST_PROFILE_CODE } from 'src/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  data_company: any = [
    {
      value: 'PT Amerta Indah Otsuka',
      label: 'PT Amerta Indah Otsuka',
    },
  ];

  // Login Form
  loginForm!: UntypedFormGroup;
  dataLogin: any;
  submitted = false;
  isLoading = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl: string = '/';
  showNavigationArrows: any;
  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private cookieService: CookieService,
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService,
    public service: AppService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  private redirect() {
    const fullUrl = window.location.href;
    const appurl = fullUrl.split('/auth/login')[0];
    const redirectUrl = appurl + this.returnUrl;

    setTimeout(() => {
      window.location.href = redirectUrl;
      window.location.reload();
    }, 3000);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      company: ['PT Amerta Indah Otsuka', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    this.isLoading = true;

    if (this.loginForm.valid) {
      // Login Api
      // Check whether employee data exists in the database
      this.authenticationService
        .login(this.f['username'].value, this.f['password'].value, this.f['company'].value)
        .subscribe((result: any) => {
          if (result.status) {
            this.dataLogin = result.data;
            const activeProfile = this.get_defaultProfile(
              { ...result.data.authorization[0] },
              result.data.profile
            );
            this.dataLogin.role = activeProfile;
            this.dataLogin.active_profile = activeProfile;
            this.cookieService.set('lang', 'en');
            sessionStorage.setItem('toast', 'true');

            PersistenceStorage.user.set(this.dataLogin);
            PersistenceStorage.token.set(result.token);

            this.redirect();
            
          } else {
            this.isLoading = false;
            this.service.warningMessage("Can't Login", result?.message || 'Data Not Found');
          }
        });
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  get_defaultProfile(authorization: any, profile: any) {
    const findSuperAdmin = profile.find((item: any) => {
      return item.mst_profile.profile_name == MST_PROFILE_CODE.SUPER_ADMIN;
    });

    if (findSuperAdmin) {
      return MST_PROFILE_CODE.SUPER_ADMIN;
    }

    const findTechnician = profile.find((item: any) => {
      return item.mst_profile.profile_name == MST_PROFILE_CODE.TECHNICIAN;
    });

    if (findTechnician) {
      return MST_PROFILE_CODE.TECHNICIAN;
    }

    // return result ? result.mst_profile.profile_name : '';
    return MST_PROFILE_CODE.SELF_SERVICES;
  }
}
