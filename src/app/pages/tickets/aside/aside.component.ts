import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {IMenuType} from "../../../models/menuType";


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  public menuTypes: IMenuType[];
  public selectedMenuType: IMenuType;
  obj = {type: 'custom', label: 'Обычное'}

  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }
  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev)
    // const obj = {val1: 1,val2: 2}
    this.updateMenuType.emit(ev.value);
  }


}
