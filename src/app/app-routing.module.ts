import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {TicketsComponent} from "./pages/tickets/tickets.component";
import {SettingModule} from "./pages/setting/setting.module";



const routes: Routes = [
  {
    path: 'auth',
    loadChildren: ()  => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tickets',
    loadChildren: ()  => import('./pages/tickets/tickets.module').then(m => m.TicketsModule)
  },
  { path: '**',
    redirectTo: 'auth'
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
