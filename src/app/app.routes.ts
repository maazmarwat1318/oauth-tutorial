import { Routes } from '@angular/router';
import { ViewEmailComponent } from './view-email.component';
import { HomeComponent } from './home.cpmponent';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'view-emails',
    component: ViewEmailComponent,
  },
];
