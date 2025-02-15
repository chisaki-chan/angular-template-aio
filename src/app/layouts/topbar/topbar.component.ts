import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Inject,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventService } from '../../core/services/event.service';

//Logout
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/shared/service/app.service';

// Language
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { allNotification, messages } from './data';
import { CartModel } from './topbar.model';
import { cartData } from './data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { restApiService } from '../../core/services/rest-api.service';
import { PersistenceStorage } from 'src/app/utils/persistence-storage';
import { SELF_SERVICE_PROFILE } from 'src/constants/initial-value';

interface ResponseNotification {
  status: boolean;
  data: {
    id: number;
    notification_type: 'Need Action' | 'Message';
    employee_code: string;
    message: string;
    action_url: string;
    is_read: boolean;
    created_at: string;
    created_by: string;
    title: string;
  }[];
}

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  element: any;
  mode: string | undefined;
  electronAPI: any;
  selfServiceProfile = SELF_SERVICE_PROFILE;
  @Output() mobileMenuButtonClicked = new EventEmitter();
  allnotifications: any;
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  userData: any;
  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;
  totalNotify: number = 0;
  newNotify: number = 0;
  readNotify: number = 0;
  isDropdownOpen = false;
  profilePic: any = null;
  @ViewChild('removenotification') removenotification!: TemplateRef<any>;
  notifyId: any;
  notificationData: ResponseNotification | undefined;
  notificationMessages: ResponseNotification['data'] = [];
  notificationActions: ResponseNotification['data'] = [];
  active_profile: string = '';

  constructor(
    public service: AppService,
    @Inject(DOCUMENT) private document: any,
    private eventService: EventService,
    public languageService: LanguageService,
    private modalService: NgbModal,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private authService: AuthenticationService,
    private router: Router,
    private restApiService: restApiService
  ) {}

  ngOnInit(): void {
    const user = PersistenceStorage.user.get();
    this.userData = user || {};
    this.element = document.documentElement;
    this.profilePic = user?.employment?.profile_pic;
    this.active_profile = user?.role || '';

    this.restApiService.getNotification().subscribe((data) => {
      this.notificationData = data;
      this.mapNotificationData(data.data);
    });

    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    // Fetch Data
    this.allnotifications = allNotification;

    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      var item_price = item.quantity * item.price;
      this.total += item_price;
    });

    // electron API handler
    if (window.electronAPI) {
      this.electronAPI = window.electronAPI;
    }
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open');
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    // this.submitted = false;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.documentElement.setAttribute('data-bs-theme', 'light');
        break;
      case 'dark':
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        break;
      default:
        document.documentElement.setAttribute('data-bs-theme', 'light');
        break;
    }
  }

  /***
   * Language Listing
   */
  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
    { text: 'Indonesia', flag: 'assets/images/flags/id.svg', lang: 'id' },
    { text: 'Japan', flag: 'assets/images/flags/jp.svg', lang: 'jp' },

    // { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    // { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'de' },
    // { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
    // { text: 'русский', flag: 'assets/images/flags/russia.svg', lang: 'ru' },
    // { text: '中国人', flag: 'assets/images/flags/china.svg', lang: 'ch' },
    // { text: 'français', flag: 'assets/images/flags/french.svg', lang: 'fr' },
    // { text: 'Arabic', flag: 'assets/images/flags/ar.svg', lang: 'ar' },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Logout the user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  windowScroll() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      (document.getElementById('back-to-top') as HTMLElement).style.display = 'block';
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById('back-to-top') as HTMLElement).style.display = 'none';
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

  // Delete Item
  deleteItem(event: any, id: any) {
    var price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
    var Total_price = this.total - price;
    this.total = Total_price;
    this.cart_length = this.cart_length - 1;
    this.total > 1
      ? ((document.getElementById('empty-cart') as HTMLElement).style.display = 'none')
      : ((document.getElementById('empty-cart') as HTMLElement).style.display = 'block');
    document.getElementById('item_' + id)?.remove();
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    } else {
      this.isDropdownOpen = true;
    }
  }
  // Search Topbar
  Search() {
    var searchOptions = document.getElementById('search-close-options') as HTMLAreaElement;
    var dropdown = document.getElementById('search-dropdown') as HTMLAreaElement;
    var input: any, filter: any, ul: any, li: any, a: any | undefined, i: any, txtValue: any;
    input = document.getElementById('search-options') as HTMLAreaElement;
    filter = input.value.toUpperCase();
    var inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add('show');
      searchOptions.classList.remove('d-none');
      var inputVal = input.value.toUpperCase();
      var notifyItem = document.getElementsByClassName('notify-item');

      Array.from(notifyItem).forEach(function (element: any) {
        var notifiTxt = '';
        if (element.querySelector('h6')) {
          var spantext = element.getElementsByTagName('span')[0].innerText.toLowerCase();
          var name = element.querySelector('h6').innerText.toLowerCase();
          if (name.includes(inputVal)) {
            notifiTxt = name;
          } else {
            notifiTxt = spantext;
          }
        } else if (element.getElementsByTagName('span')) {
          notifiTxt = element.getElementsByTagName('span')[0].innerText.toLowerCase();
        }
        if (notifiTxt) element.style.display = notifiTxt.includes(inputVal) ? 'block' : 'none';
      });
    } else {
      dropdown.classList.remove('show');
      searchOptions.classList.add('d-none');
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    var searchOptions = document.getElementById('search-close-options') as HTMLAreaElement;
    var dropdown = document.getElementById('search-dropdown') as HTMLAreaElement;
    var searchInputReponsive = document.getElementById('search-options') as HTMLInputElement;
    dropdown.classList.remove('show');
    searchOptions.classList.add('d-none');
    searchInputReponsive.value = '';
  }

  // Remove Notification
  checkedValGet: any[] = [];
  onCheckboxChange(event: Event, id: any, is_read: boolean) {
    event.preventDefault();
    this.notifyId = id;

    fetch(`${environment.apiUrl}/notifications/read/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PersistenceStorage.token.get()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.notificationData = data;
        this.mapNotificationData(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  notificationDelete() {
    this.calculatenotification();
    this.modalService.dismissAll();
  }

  calculatenotification() {
    this.totalNotify = 0;
    this.checkedValGet = [];

    this.checkedValGet.length > 0
      ? ((document.getElementById('notification-actions') as HTMLElement).style.display = 'block')
      : ((document.getElementById('notification-actions') as HTMLElement).style.display = 'none');
    if (this.totalNotify == 0) {
      document.querySelector('.empty-notification-elem')?.classList.remove('d-none');
    }
  }

  toggleItemProfile(event: any) {
    const menuProfile = document.getElementById('sidebarProfile');

    if (menuProfile) {
      if (menuProfile.classList.contains('show')) {
        menuProfile.classList.remove('show');
      } else {
        menuProfile.classList.add('show');
      }
    }
  }

  click_profileChange(profile_name: string) {
    const user = PersistenceStorage.user.get();
    if (user) {
      user.role = profile_name;
      PersistenceStorage.user.set(user);
      window.location.reload();
    }
  }

  mapNotificationData(data: ResponseNotification['data']) {
    this.notificationMessages = data.filter((item) => item.notification_type === 'Message');
    this.notificationActions = data
      .filter((item) => item.notification_type === 'Need Action')
      .map((item) => ({
        ...item,
        action_url: environment.production
          ? item.action_url.replace('http://localhost:4200', 'https://myapps.aio.co.id/angular-template')
          : item.action_url,
      }));
  }

  handleMinimize() {
    window.electronAPI?.minimizeWindow();
  }

  handleMaximize() {
    window.electronAPI?.maximizeWindow();
  }

  handleClose() {
    window.electronAPI?.closeWindow();
  }

  showNotification() {
    window.electronAPI?.showNotification();
  }
}
