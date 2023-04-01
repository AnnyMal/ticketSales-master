import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITours} from "../../../models/tours";
import {BlockStyleDirective} from "../../../directive/blocks-style.directive";
import {Router} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})

export class TicketListComponent implements OnInit {
  tickets: ITours[];
  isActive = false;

  @ViewChild('tourWrap', {read: BlockStyleDirective}) blockDirective: BlockStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef<any>;

  constructor(private ticketService: TicketsService,
              private router: Router,
              private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketStorage.setStorage(data);

        // this.blockDirective.initStyle(0)
      }
    )
  }

  ngAfterViewInit(){
    this.blockDirective.initStyle(0)
  }
  goToTicketInfoPage(item: ITours){
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }
  directiveRenderComplete(ev: boolean){
  this.isActive = true;
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'backgroundColor : green')
    this.blockDirective.initStyle(0)
}

}
