import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INearestTour, ITourLocation, ITours} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<ITours[]> {
    return this.http.get<ITours[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/');
  }
  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }
  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/')
  }
  getLocationList(): Observable<ITourLocation[]>{
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }
  getRandomNearestEvent(type: number): Observable<INearestTour> {
    switch (type){
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/a.json')
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json')
      case 2:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json')
      default:
        return this.http.get<INearestTour>('X:\\Angular\\ticketSales-master3\\src\\assets\\mocks\\nearestTours2.json')
    }
  }
  sendTourDara (data: any){
    return this.http.post('/assets/mocks/',data)

  }

}

