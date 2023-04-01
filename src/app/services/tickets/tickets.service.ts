import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TicketRestService} from "../rest/ticket-rest.service";
import {ITours} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITours[]> {
    return this.ticketServiceRest.getTickets()
  }
}
