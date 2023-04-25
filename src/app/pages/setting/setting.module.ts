import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import {SettingComponent} from "./setting.component";
import {TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import { ChangePswComponent } from './change-psw/change-psw.component';
import {InputTextModule} from "primeng/inputtext";


@NgModule({//здесь компоненты
  declarations: [
    SettingComponent,
    ChangePswComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    TabViewModule,
    FormsModule,
    InputTextModule,
  ]
})
export class SettingModule { }

