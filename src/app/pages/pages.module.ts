import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbToastModule, NgbProgressbarModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularReactModule } from '@bubblydoo/angular-react'

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from '@lordicon/element';
import lottie from 'lottie-web';
import { DndModule } from 'ngx-drag-drop';

// Pages Routing
import { PagesRoutingModule } from './pages-routing.module';

//Component

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastsContainer } from './dashboard/toasts-container.component';
import { DashboardsModule } from './template/dashboards/dashboards.module';
import { AppsModule } from './template/apps/apps.module';
import { EcommerceModule } from './template/ecommerce/ecommerce.module';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { NgStepperModule } from 'angular-ng-stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { DashboardProjectProgressComponent } from './dashboard/dashboard-project-progress/dashboard-project-progress.component';
import { DashboardProjectSummaryComponent } from './dashboard/dashboard-project-summary/dashboard-project-summary.component';
import { HotTableModule } from '@handsontable/angular'
import { registerAllModules } from 'handsontable/registry'

registerAllModules();

@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    DashboardProjectProgressComponent,
    DashboardProjectSummaryComponent
  ],
  imports: [
    PagesRoutingModule,
    NgbNavModule,
    NgSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbToastModule,
    NgbProgressbarModule,
    FlatpickrModule.forRoot(),
    CountUpModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    SharedModule,
    WidgetModule,
    SlickCarouselModule,
    LightboxModule,
    DashboardsModule,
    AppsModule,
    EcommerceModule,
    DropzoneModule,
    NgbModule,
    NgStepperModule,
    CdkStepperModule,
    ToastrModule.forRoot(),
    CKEditorModule,
    AngularReactModule,
    DndModule,
    HotTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
