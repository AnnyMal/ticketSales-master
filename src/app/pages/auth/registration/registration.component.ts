import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  login: string;
  psw: string;
  pswRepeat: string;
  cardNumber: string;
  email: string;
  selectedValue: boolean;

  constructor(private messageService: MessageService,
              private authService : AuthService) {
  }

  ngOnInit(): void {

  }

  registration(ev: Event): void |boolean {
    if (this.psw !== this.pswRepeat) {
      this.messageService.add({severity:'error', summary:'Пароли не совпадают'});
      return false;
    }
    const userObj: IUser = {
      psw: this.psw,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }
    if (!this.authService.isUserExists(userObj)) {
      this.authService.setUser(userObj)
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'});
      if (this.selectedValue){
      window.localStorage.setItem(`userLogin${userObj.login}`, JSON.stringify(userObj))
      }
    }
    else {
      this.messageService.add({severity: 'warning', summary: 'Пользователь уже зарегистрирован'})
    }
}
  saveUser():void{

  }
}
