import { Component, OnInit } from '@angular/core';
import {ITours} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItem1Component implements OnInit {
  ticket: ITours | undefined;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    //считываем параметры
    const routeIdParam = this.route.snapshot.paramMap.get('id'); // значение, которое передано при маршрутизации (связано с тек. роутингом)
    const queryIDParam = this.route.snapshot.queryParamMap.get('id'); // глобальный Map всех параметров
    //записываем значение либо одного параметра или другого
    const paramValueId = routeIdParam || queryIDParam
    //если есть возвращает массив и ищет нужный элемент
    if(paramValueId){
      const ticketStorage = this.ticketStorage.getStorage() //возвращает массив
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }
  }

}
