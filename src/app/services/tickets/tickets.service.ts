import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {TicketRestService} from "../rest/ticket-rest.service";
import {INearestTour, ITourLocation, ITours} from "../../models/tours";
import {ITourTypeSelect} from "../../models/tours";
import {Subject} from "rxjs";
import {ICustomTicketData} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private ticketSubject = new Subject<ITourTypeSelect>();

  readonly ticketType$ = this.ticketSubject.asObservable();//вариант 1

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITours[]> {
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTour = value.filter((el) => el.type === "single");
        return value.concat(singleTour);
      }
    ))
  }
  getTicketTypeObservable(): Observable<ITourTypeSelect> {//вариант 2
    return this.ticketSubject.asObservable();
  }
  updateTour(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }
  getError(): Observable<any>{
    return this.ticketServiceRest.getRestError()
  }
  getNearestTours(): Observable<INearestTour[]>{
    return this.ticketServiceRest.getNearestTickets();
  }
  getToursLocation(): Observable<ITourLocation[]>{
    return this.ticketServiceRest.getLocationList();
  }
  transformData (data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[]{
    const newTicketData: ICustomTicketData[] = [];
    data.forEach((el) => {
      const newEl = <ICustomTicketData> {...el};
      newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {};
      newTicketData.push(newEl);
    });
    return newTicketData;
  }
  getRandomNearestEvent(type: number): Observable<INearestTour>{
    return this.ticketServiceRest.getRandomNearestEvent(type);
  }
  sendTourData(data: any): Observable<any>{
    return this.ticketServiceRest.sendTourDara(data)
  }


}
