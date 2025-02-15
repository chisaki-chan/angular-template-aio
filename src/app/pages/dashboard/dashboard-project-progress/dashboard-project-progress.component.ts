import { Component, Input } from '@angular/core';
import { MainService } from 'src/app/core/services/main.service';
import { AppService } from 'src/app/shared/service/app.service';
import { ITrProject } from 'src/types';

@Component({
  selector: 'app-dashboard-project-progress',
  templateUrl: './dashboard-project-progress.component.html',
  styleUrl: './dashboard-project-progress.component.scss',
})
export class DashboardProjectProgressComponent {
  @Input() data: ITrProject[] = [];
  @Input() dataMasterProjectFlow: any = [];
  @Input() projectFlowState: any = [];

  constructor(public service: AppService, public mainService: MainService) {}

  parseId(arg0: number): any {
    return btoa(arg0.toString());
  }
}
