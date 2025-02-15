import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboard/dashboard.component";

import { AuthGuard } from '../core/guards/auth.guard';



const routes: Routes = [

  {
    path: "",
    component: DashboardComponent
  },
  {
    path: '', loadChildren: () => import('./template/dashboards/dashboards.module').then(m => m.DashboardsModule)
  },















  {
    path: 'apps', loadChildren: () => import('./template/apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'ecommerce', loadChildren: () => import('./template/ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path: 'projects', loadChildren: () => import('./template/projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'tasks', loadChildren: () => import('./template/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'crm', loadChildren: () => import('./template/crm/crm.module').then(m => m.CrmModule)
  },
  {
    path: 'crypto', loadChildren: () => import('./template/crypto/crypto.module').then(m => m.CryptoModule)
  },
  {
    path: 'invoices', loadChildren: () => import('./template/invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'tickets', loadChildren: () => import('./template/tickets/tickets.module').then(m => m.TicketsModule)
  },
  {
    path: 'pages', loadChildren: () => import('./template/extrapages/extraspages.module').then(m => m.ExtraspagesModule)
  },
  { path: 'ui', loadChildren: () => import('./template/ui/ui.module').then(m => m.UiModule) },
  {
    path: 'advance-ui', loadChildren: () => import('./template/advance-ui/advance-ui.module').then(m => m.AdvanceUiModule)
  },
  {
    path: 'forms', loadChildren: () => import('./template/form/form.module').then(m => m.FormModule)
  },
  {
    path: 'tables', loadChildren: () => import('./template/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'charts', loadChildren: () => import('./template/charts/charts.module').then(m => m.ChartsModule)
  },
  {
    path: 'icons', loadChildren: () => import('./template/icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'maps', loadChildren: () => import('./template/maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'marletplace', loadChildren: () => import('./template/nft-marketplace/nft-marketplace.module').then(m => m.NftMarketplaceModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
