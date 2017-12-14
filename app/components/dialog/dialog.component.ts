/* Angular */
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as Typed from 'typed.js';  

/* Services */
import { RDataSvc } from '../../providers/rdata.service';
import { DialogSvc } from '../../providers/dialog.service';

/* Models & Constants */
import { sentence } from '../../constants/dialogs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { chartRDataItemModel } from '../../models/chartRData.model';
import { parseChartData } from '../../components/chart/chart.parser';
import { ChartData, chartDataModel } from '../../models/chartData.model';


@Component({
    template: `
    <div class="dialog sentence--{{modificator}}">
        <samanta-component class="samanta" [modificator]="'fullsize'" [data]="samanta" (onTypeEnded)="setUserSentence($event)"></samanta-component>
        <user-component class="user" [modificator]="'fullsize'" [data]="user" (onAnswerSelected)="setSamantaSentence($event)"></user-component>
    </div>
    <div class="panel panel--white">
        <div class="chart-overlay" [ngClass]="{ hidden: chartVisible }"></div>
        <chart-component class="chart-component" [modificator]="'fullsize'" [data]="data"></chart-component>     
    </div>  
    `,
	selector: 'dialog-component',
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class DialogComponent {

  @Input() dialog: any; // main data object
  @Input() modificator: string; // CSS BEM class modificator
  
  private samanta: BehaviorSubject<Array<sentence>>;
  private user = new Subject<Array<sentence>>();
  public chartVisible: boolean = false;
  public data: any;

  constructor(private rdataSvc: RDataSvc, private dialogSvc: DialogSvc) { console.log('Dialog component created.') }

  ngOnInit() {
    this.samanta = new BehaviorSubject<Array<sentence>>([this.dialog.samanta[0]]);
    this.data = this.getRDataMock().map(res => parseChartData(res.json()));
  }

  setUserSentence(event) { 
    this.doAction(event.data.action);
    this.user.next(this.findAnswers(this.dialog.user, event.data));
  }

  setSamantaSentence(event) {
    this.samanta.next(this.findAnswers(this.dialog.samanta, event.data));
  }

  findAnswers(source, names) {
    if(!names.answers || !names.answers.length) { return null; }
    let answers = [];
    names.answers.forEach((name) => {
        source.forEach((answer) => {
            if(answer.name === name) {
                answers.push(answer);
            }
        });
    });  
    return answers;
  }

  doAction(action) {
    if(!action) { return null; }
    this.chartVisible = this.dialogSvc[action](); // TODO handle this in a more proper way
  }

  getRDataMock() {
    return this.rdataSvc.getRDataForChart();
  }

}