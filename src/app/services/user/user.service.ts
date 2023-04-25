import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | null;
  private token: string | null;

  constructor() { }

  public getUser() {
    return this.user;
  };

  public setUser(user: IUser) {
   this.user = user;
  };

  setToken(token: string) {
    this.token = token;//записывается токен
    window.localStorage.setItem('Token',token);
  }
  getToken():string | null{
    return this.token || window.localStorage.getItem('Token');// возвращается токен
  }
  removeUser(){
    this.user = null;
    this.token = null;
  }
}
