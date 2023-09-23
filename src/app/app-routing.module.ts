import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BossListComponent } from './boss/boss-list/boss-list.component';
import { InventoryPageComponent } from './inventory/inventory-page/inventory-page.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'bosses',
    component: BossListComponent
  },
  {
    path: 'inventory',
    component: InventoryPageComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
