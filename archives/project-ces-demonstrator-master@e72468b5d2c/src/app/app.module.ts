import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuiHeaderComponent } from './cui/cui-header/cui-header.component';
import { UiLibraryModule } from './cui/shared/ui-library/ui-library.module';
import { CuiSideNavigationComponent } from './cui/cui-side-navigation/cui-side-navigation.component';
import { ReleaseNotesComponent } from './cui-demo/release-notes/release-notes.component';
import { CuiResourcesComponent } from './cui-demo/cui-resources/cui-resources.component';
import { CuiFooterComponent } from './cui/cui-footer/cui-footer.component';
import { CarListComponent } from './cui-demo/car-list/car-list.component';
import { TableOverviewComponent } from './cui-demo/table-overview/table-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { API_URL } from '../app/cui/shared/api/api-url';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AiCalibrationSuiteComponent } from './ces/ai-calibration-suite/ai-calibration-suite.component';
import { VecuCalibrationComponent } from './ces/vecu-calibration/vecu-calibration.component';
import { AnalyzeFleetLoggerDataComponent } from './ces/analyze-fleet-logger-data/analyze-fleet-logger-data.component';
import { AiChatComponent } from './ces/ai-chat/ai-chat.component';
import { CesDashboardComponent } from './ces/ces-dashboard/ces-dashboard.component';

/**
 * The root module of the Angular application.
 *
 * This module defines the main components and imports necessary for the application to run.
 */
@NgModule({
  declarations: [
    AppComponent,
    CuiHeaderComponent,
    CuiSideNavigationComponent,
    ReleaseNotesComponent,
    CuiResourcesComponent,
    CuiFooterComponent,
    CarListComponent,
    TableOverviewComponent,
    AiCalibrationSuiteComponent,
    VecuCalibrationComponent,
    AnalyzeFleetLoggerDataComponent,
    AiChatComponent,
    CesDashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    UiLibraryModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
