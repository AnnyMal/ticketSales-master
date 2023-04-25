import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITours} from "../../../models/tours";
import {BlockStyleDirective} from "../../../directive/blocks-style.directive";
import {Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {debounceTime, fromEvent, Subscription} from "rxjs";
import {ITourTypeSelect} from "../../../models/tours";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})

export class TicketListComponent implements OnInit, OnDestroy {
  tickets: ITours[];
  ticketsCopy: ITours[];
  isActive = false;

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective;//доступ к dom элементу, к директиве
  @ViewChild('tourWrap') tourWrap: ElementRef;

  //subscription
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;
  tourUnsubscriber: Subscription;


  constructor(private ticketService: TicketsService,
              private router: Router,
              private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets]
        this.ticketStorage.setStorage(data);
      }
      )


        this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data: ITourTypeSelect) => {
          console.log('data', data)

          let ticketType: string;
          switch (data.value) {
            case "single":
              this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
              break;
            case "multi":
              this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
              break;
            case "all":
              this.tickets = [...this.ticketsCopy];
              break;
          }


          if (data.date) {
            const dateWithoutTime = new Date(data.date).toISOString().split('T');
            const dateValue = dateWithoutTime[0]
            console.log('dateValue',dateValue)
            this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
          }
          //сначала реализуем объект, потом добавляем границы
          setTimeout(() => {

            this.blockDirective.updateItems();

            this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
          });

        });
      }

  ngAfterViewInit(){
    const fromEventObserver= fromEvent(this.ticketSearch.nativeElement,'keyup')
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
      if (this.ticketSearchValue){
        // const arr = this.ticketSearchValue[0].toUpperCase() + this.ticketSearchValue.slice(1).toLowerCase()
        this.tickets = this.ticketsCopy.filter((el) => {
          const nameToLower = typeof (el?.name) === "string" ? el.name.toLowerCase() : '';
          return nameToLower.includes(this.ticketSearchValue.toLowerCase());
        });
      } else {
        this.tickets = [...this.ticketsCopy];
      }
      }
    )
  }
  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  goToTicketInfoPage(item: ITours){
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }
  directiveRenderComplete(ev: boolean){
  this.isActive = true;
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color:#dbe7db');
    this.blockDirective.initStyle(0)
}


}
