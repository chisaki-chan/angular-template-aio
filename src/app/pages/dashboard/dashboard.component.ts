import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastService } from './toast-service';
import { ReactButton as Button } from './button';

import { AppService } from 'src/app/shared/service/app.service';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { restApiService } from '../../core/services/rest-api.service';
import { IMstProjectFlow } from 'src/types';
import Handsontable from 'handsontable';

interface DashboardProjectState {
  project_id: number;
  project_name: string;
  flow_id: number;
  flow: string;
  state: string;
}

type GroupedProjectFlow = {
  project_id: number;
  project_name: string;
  flow_ids: Array<number>;
  state: Array<'Done' | 'Pending' | 'Progress' | undefined>;
};

type TActiveTab = 'summary' | 'progress';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  /**
   * Handsontable
   */
  Button = Button;
  @ViewChild('hotTable') hotTable!: ElementRef;

  hotSettings: Handsontable.GridSettings = {};
  hotInstance!: Handsontable;

  loading = false;
  breadCrumbItems!: Array<{}>;
  users: any = [];
  data: any = [];
  dataProjectFlow: DashboardProjectState[] = [];
  dataMasterProjectFlow: IMstProjectFlow[] = [];
  projectFlowState: GroupedProjectFlow[] = [];

  activeTab: TActiveTab = 'summary';

  constructor(
    public toastService: ToastService,
    public service: AppService,
    private TokenStorageService: TokenStorageService,
    private restApiService: restApiService
  ) {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Dashboard', active: true }];

    if (sessionStorage.getItem('toast')) {
      this.toastService.show('Logged in Successfully.', {
        classname: 'bg-success text-center text-white',
        delay: 5000,
      });
      sessionStorage.removeItem('toast');
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.service.getUsers();
    
    if (this.hotInstance) {
      this.hotInstance.updateSettings({
        data: this.users
      });
    } else {
      this.initializeHandsontable();
    }
  }

  initializeHandsontable() {
    if (this.hotTable && this.hotTable.nativeElement) {
      const component = this; // Simpan referensi ke `this`
  
      this.hotInstance = new Handsontable(this.hotTable.nativeElement, {
        licenseKey: 'non-commercial-and-evaluation',
        data: this.users,
        columns: [
          { data: 'lg_nik', type: 'text', readOnly: true },
          { data: 'lg_name', type: 'text' },
          { data: 'lg_email_aio', type: 'text' },
        ],
        colHeaders: ['NIK', 'Name', 'Email'],
        rowHeaders: true,
        width: '100%',
        height: 400,
        stretchH: 'all',
        contextMenu: {
          items: {
            "remove_row": {
              name: "Delete row",
              callback: async (key, selection) => {
                const rowIndex = selection[0].start.row;
                await this.deleteUser(rowIndex);
              }
            }
          }
        },
        afterGetRowHeader(row, TH) {
          if (row === component.users.length) {
            TH.innerHTML = `<button class="add-row-btn">+</button>`;
            TH.style.textAlign = 'center';
          } else {
            TH.innerText = (row + 1).toString();
          }
        },
        afterRender: () => {
          setTimeout(() => {
            const addButton = this.hotTable.nativeElement.querySelector('.add-row-btn');
            if (addButton) {
              addButton.addEventListener('click', () => {
                this.addUser(); // Panggil fungsi addUser saat tombol diklik
              });
            }
          }, 100);
        },
        afterChange: async (changes, source) => {
          if (source === 'edit' && changes) {
            for (let change of changes) {
              const [row, prop, oldValue, newValue] = change;
              if (oldValue !== newValue && typeof prop === 'string') {
                const userId = this.users[row].lg_nik;
                const updateData: Record<string, any> = {};
                updateData[prop] = newValue;
                await this.service.updateUser(userId, updateData);
              }
            }
          }
        },
      });
    }
  }
  
  
  
  

  async addUser() {
    const newUser = { lg_nik: 'NEW' + Date.now(), lg_name: '', lg_email_aio: '' };
    await this.service.createUser(newUser);
    await this.loadUsers();
  }

  async deleteUser(rowIndex: number) {
    try {
      const userId = this.users[rowIndex].lg_nik;
      await this.service.deleteUser(userId);
  
      // Hapus dari array Handsontable
      this.users.splice(rowIndex, 1);
      this.hotInstance.loadData(this.users);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
  
}
