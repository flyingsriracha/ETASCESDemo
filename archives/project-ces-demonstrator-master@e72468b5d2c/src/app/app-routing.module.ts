import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseNotesComponent } from './cui-demo/release-notes/release-notes.component';
import { CuiResourcesComponent } from './cui-demo/cui-resources/cui-resources.component';
import { CarListComponent } from './cui-demo/car-list/car-list.component';
import { TableOverviewComponent } from './cui-demo/table-overview/table-overview.component';
import { DashboardDemoComponent } from './cui-demo/dashboard-demo/dashboard-demo.component';
import { CesDashboardComponent } from './ces/ces-dashboard/ces-dashboard.component';
import { VecuCalibrationComponent } from './ces/vecu-calibration/vecu-calibration.component';
import { AiCalibrationSuiteComponent } from './ces/ai-calibration-suite/ai-calibration-suite.component';
import { AnalyzeFleetLoggerDataComponent } from './ces/analyze-fleet-logger-data/analyze-fleet-logger-data.component';
import { AiChatComponent } from './ces/ai-chat/ai-chat.component';


/**
 * The routing module for the application.
 * Defines the routes and their corresponding components.
 */
const routes: Routes = [
  {
    path: '',
    component: CesDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: '',
    component: CesDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },

  {
    path: 'vecu-calibration',
    component: VecuCalibrationComponent,
    data: {
      title: 'VECU Calibration'
    }
  },
  {
    path: 'ai-calibration-suite',
    component: AiCalibrationSuiteComponent,
    data: {
      title: 'AI Calibration Suite'
    }
  },
  {
    path: 'ai-chat',
    component: AiChatComponent,
    data: {
      title: 'AI Chat'
    }
  },
  {
    path: 'analyze-fleet-logger-data',
    component: AnalyzeFleetLoggerDataComponent,
    data: {
      title: 'Analyze Fleet Logger Data'
    }
  },
  {
    path: 'cui-resources',
    component: CuiResourcesComponent,
    data: {
      title: 'CUI resources overview'
    }
  },
  {
    path: 'car-list',
    component: CarListComponent,
    data: {
      title: 'Data Table Demo 2'
    }
  },
  {

    path: 'product-list',
    component: TableOverviewComponent,
    data: {
      title: 'Data Table Demo 1'
    }
  },
  {
    path: 'dashboard-demo',
    component: DashboardDemoComponent,
    data: {
      title: 'Dashboard demo page'

    }
  }
];

/**
 * The main routing module for the application.
 * Configures the router with the defined routes.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
