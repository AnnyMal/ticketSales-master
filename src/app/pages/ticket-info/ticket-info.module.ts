import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketInfoRoutingModule } from './ticket-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CarouselModule} from "primeng/carousel";


@NgModule({
  declarations: [
    TicketItemComponent
  ],
    imports: [
        CommonModule,
        TicketInfoRoutingModule,
        CalendarModule,
        InputTextModule,
        InputNumberModule,
        ReactiveFormsModule,
        CarouselModule,
        FormsModule
    ]
})
export class TicketInfoModule { }
