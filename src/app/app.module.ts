import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClarityModule } from '@clr/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BossListComponent } from './boss/boss-list/boss-list.component';
import { AppData } from './app-data';
import { StatusComponent } from './boss/status/status.component';
import { StarsPipe } from './pipes/stars.pipe';
import { PrimeModule } from './prime.module';
import { BossDetailsComponent } from './boss/boss-details/boss-details.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ActionsDockComponent } from './menu/actions-dock/actions-dock.component';
import { InventoryUploadComponent } from './inventory/inventory-upload/inventory-upload.component';
import { InventoryPageComponent } from './inventory/inventory-page/inventory-page.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    StarsPipe,
    BossListComponent,
    StatusComponent,
    BossDetailsComponent,
    ActionsDockComponent,
    InventoryUploadComponent,
    InventoryPageComponent,
    SettingsComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent
   ],
  imports: [
    AngularSvgIconModule.forRoot(),
    BrowserModule,
    ClarityModule,
    HttpClientModule,
    PrimeModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 2000 }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
