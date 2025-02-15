import { Component, Input } from '@angular/core';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { AppService } from 'src/app/shared/service/app.service';
import { IMstProjectFlow } from 'src/types';

@Component({
  selector: 'app-dashboard-project-summary',
  templateUrl: './dashboard-project-summary.component.html',
  styleUrl: './dashboard-project-summary.component.scss',
})
export class DashboardProjectSummaryComponent {
  constructor(
    public service: AppService,
    private TokenStorageService: TokenStorageService,
    private restApiService: restApiService
  ) {}

  modifiedDataMasterProjectFlow: IMstProjectFlow[][] = [];

  dataCount: {
    change_request: number;
    new_apps: number;
    pending: number;
    completed: number;
  } = {
    change_request: 0,
    new_apps: 0,
    pending: 0,
    completed: 0,
  };

  ngOnInit() {
    this.get_countProject();
    this.get_masterProjectFlow();
  }

  get_masterProjectFlow() {
    this.restApiService.getMasterProjectFlow().subscribe((data) => {
      let temp: IMstProjectFlow[][] = [];
      for (let i = 0; i < data.data.length; i += 4) {
        temp.push(data.data.slice(i, i + 4));
      }
      this.modifiedDataMasterProjectFlow = temp;
    });
  }

  get_countProject() {
    this.service
      .get(`/dashboard/project/count/${this.TokenStorageService.getDepartment()}`)
      .subscribe((res) => {
        if (res.status) {
          this.dataCount = res.data;
        }
      });
  }

  generateArray(value: number): any[] {
    return new Array(value);
  }
}
