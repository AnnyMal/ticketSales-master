import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest,HttpEvent} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestInterceptorsService implements HttpInterceptor{

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable <HttpEvent<any>>{

    const hasToken = this.userService.getToken();

    if (hasToken){
      //клонировали текущий запрос
      const cloned =req.clone({
        //в параметре добавлен новый заголовок методом set
        headers: req.headers.set("Authorization",
          "Bearer"+ hasToken
          )
      });
      //отправляем с помощью handle сloned
      return next.handle(cloned);}
    else{//передаем фактический запрос без токена
      return next.handle(req);
    }
}
}
