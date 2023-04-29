import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import {SettingComponent} from "./settings/setting.component";
import {TabViewModule} from "primeng/tabview";
import {FormsModule} from "@angular/forms";
import { ChangePswComponent } from './change-psw/change-psw.component';
import {InputTextModule} from "primeng/inputtext";
import {StatisticComponent} from "./statistic/statistic.component";
import {TableModule} from "primeng/table";

@NgModule({//здесь компоненты
  declarations: [
    SettingComponent,
    ChangePswComponent,
    StatisticComponent
  ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        TabViewModule,
        FormsModule,
        InputTextModule,
        TableModule,
    ]
})
export class SettingModule { }

