import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {INearestTour, ITourLocation, ITours} from 'src/app/models/tours';
import { TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {forkJoin, fromEvent, map, subscribeOn, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  ticket: ITours | undefined;
  user: IUser | null;
  userForm: FormGroup;

  nearestTours: INearestTour[];
  toursLocation: ITourLocation[];
  ticketSearchValue: string;

  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub : Subscription;
  searchTypes = [1,2,3];

  constructor(
    private route: ActivatedRoute,
    private ticketStorage: TicketsStorageService,
    private userService: UserService,
    private ticketService: TicketsService) {}

  ngOnInit(): void {
    //first get userinfo
    this.user = this.userService.getUser()

    //init formGroup
    this.userForm = new FormGroup({
      firstName: new FormGroup('', {validators: Validators.required}),
      lastName: new FormGroup(''),
      cardNumber: new FormGroup(''),
      birthDay: new FormGroup(''),
      age: new FormGroup(''),
      citizen: new FormGroup('')
    });

    //get nearest tours
  //   forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).pipe(
  //     map((data) =>{
  //     return this.ticketService.transformData(data[0], data[1]);
  //   })
  //   )
  //   .subscribe((data) => {
  //     this.toursLocation = data[1];
  //     this.nearestTours = this.ticketService.transformData(data[0],data[1]);
  // });
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) =>{
      this.nearestTours = this.ticketService.transformData(data[0],data[1]);
      this.toursLocation = data[1];
    })


    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;


    if (paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }

  }
  ngAfterViewInit(): void{
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    //регистрируем событие keyup
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement,'keyup')
    //подписываемся на событие
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) =>{
      this.initSearchTour();
    });
  }
  selectDate(ev: Event): void{
  }
  onSubmit(): void{}

  initSearchTour():void {
    const type = Math.floor(Math.random() * this.searchTypes.length);
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    //записываем результат запроса на сервер
    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    })
  }
  initTour(): void{
    const userData = this.userForm.getRawValue();
    const postData = {...this.ticket, ...userData};
    this.ticketService.sendTourData(postData).subscribe()
  }
}


