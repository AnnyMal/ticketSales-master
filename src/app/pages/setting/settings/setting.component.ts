import { Component, OnInit } from '@angular/core';
import {ObservableExampleService} from "../../../services/testing/observable-example.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../../services/settings/settings.service";


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  private subjectForUnsubscribe = new Subject();
  psw: string;


  constructor(private testing: ObservableExampleService,
              private settingsService : SettingsService) {}

  ngOnInit(): void {
    // this.subjectScope = this.testing.getSubject();
    // const myObservable = this.testing.getObservable()
    // const unsubscribe = this.subjectScope.subscribe((data) => {
    //   console.log('observer data', data)
    // });
    // unsubscribe.unsubscribe();

    //   this.subjectUnsubscribe = this.subjectScope.subscribe((data) => {
    //     console.log('data',data)
    //   })
    //
    //   this.subjectScope.next('subData');
    // }
    // ngOnDestroy(){
    //   this.subjectUnsubscribe.unsubscribe();
    // }
    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log('settings data',data)
      })

     this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe(
      (data) => {
        console.log('settings data from subject',data)
      })

  }

  ngOnDestroy(): void{
    this.subjectForUnsubscribe.next(true); //отправка данных
    this.subjectForUnsubscribe.complete();
  }

}
