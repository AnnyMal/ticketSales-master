import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TicketInfo1RoutingModule} from "./ticket-info1-routing.module";
import { TicketItem1Component } from './ticket-item/ticket-item.component';


@NgModule({
  declarations: [
    TicketItem1Component
  ],
  imports: [
    CommonModule,
    TicketInfo1RoutingModule
  ]
})
export class TicketInfoModule { }
