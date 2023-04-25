import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-change-psw',
  templateUrl: './change-psw.component.html',
  styleUrls: ['./change-psw.component.scss']
})
export class ChangePswComponent implements OnInit {
  currentPsw: string;
  newPass: string;
  newPassRepeat: string;

  constructor(private userService : UserService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }
  passChangeCheck(ev: Event): void |boolean{
    const userPsw =this.userService.getUser()?.psw;
    if (userPsw !== this.currentPsw){
      this.messageService.add({severity:'error',summary:"Введен неверный текущий пароль"});
      return false;
    }
    if (this.newPass != this.newPassRepeat){
      this.messageService.add({severity:'error',summary:"Проверьте данные"});
      return false;
    } else{
      this.messageService.add({severity:'success',summary:"Пароль изменен"});
    }
    const user = this.userService.getUser()
    const newUser =<IUser> {...user};
    newUser.psw = this.newPass;
    this.userService.setUser(newUser);
  }

}
