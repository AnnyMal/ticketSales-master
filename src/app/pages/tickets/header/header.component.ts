import {Component, OnDestroy, OnInit,Input,SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];

  @Input() test:string='initValue'
  time: Date;
  private timerInterval: number;
  public user: IUser | null;
  private settingsActive = true;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.items = this.initMenuItems();

    this.user = this.userService.getUser();
    this.timerInterval = window.setInterval(() => {
        this.time = new Date();
      }, 1000)
    }


  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  ngOnChanges(ev: SimpleChanges): void {
    console.log('ev', ev)
    if (ev['menuType']) {
      this.settingsActive = this.menuType?.type === "extended";
      this.items = this.initMenuItems();
    }
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink: ['setting'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink: ['/auth'],
        command:() => {
          this.userService.removeUser()
        }
      },

    ];
  }
}
