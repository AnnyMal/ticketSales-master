import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {find} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private usersStorage : IUser[] = [];

  constructor() { }
  checkUser(user: IUser): boolean{
   return true;
    // const isUserExists = this.usersStorage.find((el)=>el.login === user.login);
    // const isUserLocalStorage = localStorage.getItem('userLogin:' + `${user.login}`);
    // let userInStore: IUser = <IUser>{};
    // if (isUserLocalStorage){
    //   userInStore = JSON.parse(isUserLocalStorage);
    //   return true;
    // }
    //
    // else if(userInStore){
    //   return userInStore.psw === user.psw
    // } else if (isUserExists) {
    //   return true;
    // }
    // return false;
  }
  setUser(user: IUser): void{
    const isUserExists = this.usersStorage.find((el)=>el.login === user.login);
    if (!isUserExists && user?.login){
      this.usersStorage.push(user)
    }
  }
  isUserExists(user: IUser): boolean{
    const isUserExists = this.usersStorage.find((el)=>el.login ===user.login)
    return !!isUserExists;
  }
  saveUser(user: IUser):void{
  }
}
