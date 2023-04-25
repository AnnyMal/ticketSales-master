import {Component, Input, OnDestroy, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UserService} from "../../../services/user/user.service";


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit,OnDestroy,OnChanges {
  @Input() inputProp = 'test';
  @Input() inputObj: any;

  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit():void {
    this.authTextButton="Авторизоваться"
  }
  ngOnDestroy(){
    console.log('destroy')
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
  }
  vipStatusSelected():void{
    }

    onAuth(ev: Event): void {//метод: успешно ли пользователь авторизовался?
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }
    if (this.authService.checkUser(authUser)){
      this.userService.setUser(authUser);
      //добавляем уникальный token
      this.userService.setToken('user-private-token')

      this.router.navigate(['tickets/tickets-list'])
    }
    else {
      this.messageService.add({severity:'error',summary:"Проверьте данные"})
    }
  }

}
