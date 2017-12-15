// /* Angular */
// import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import * as Typed from 'typed.js';  

// /* Services */
// import { RDataSvc } from '../../providers/rdata.service';
// import { DialogSvc } from '../../providers/dialog.service';

// /* Models & Constants */
// import { sentence } from '../../constants/dialogs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { chartRDataItemModel } from '../../models/chartRData.model';
// import { parseChartData } from '../../components/chart/chart.parser';
// import { ChartData, chartDataModel } from '../../models/chartData.model';
// import { onTypeEnded } from '../../constants/dialog.constants';


// @Component({
//     template: `
//     <div class="dialog sentence--{{modificator}}">
//         <samanta-component class="samanta" [data]="samanta" (onTypeEnded)="handleEvent($event, true)"></samanta-component>
//         <!--<user-component class="user" [data]="user" (onAnswerSelected)="handleEvent($event)"></user-component>-->
//     </div>
//     <!--
//     <div class="panel panel--white">
//         <div class="chart-overlay" [ngClass]="{ hidden: chartVisible }"></div>
//         <chart-component class="chart-component" [modificator]="'fullsize'" [data]="data"></chart-component>     
//     </div>  
//     -->
//     `,
// 	selector: 'dialog-component',
//     changeDetection: ChangeDetectionStrategy.OnPush
// })


// export class DialogComponent {

//   @Input() dialog: any; // main data object
//   @Input() modificator: string; // CSS BEM class modificator
  
//   private samanta: BehaviorSubject<Array<sentence>>;
//   private user = new Subject<Array<sentence>>();
//   public chartVisible: boolean = false;
//   public data: any;

//   constructor(private rdataSvc: RDataSvc, private dialogSvc: DialogSvc) { console.log('Dialog component created.') }

//   ngOnInit() {
//     this.samanta = new BehaviorSubject<Array<sentence>>([this.dialog.samanta[0]]);
//     //this.data = this.getRDataMock().map(res => parseChartData(res.json()));
//   }

//   handleEvent(event: onTypeEnded, bySamanta: boolean) { 
//     this.doAction(event.action);
//     this.updateDialog(bySamanta, event)
//   }

//   doAction(action) {
//     if(!action) { return null; }
//     this.chartVisible = this.dialogSvc[action](); // TODO handle this in a more proper way
//   }

//   getRDataMock() {
//     return this.rdataSvc.getRDataForChart();
//   }

//   updateDialog(bySamanta: boolean, event: onTypeEnded) {
//     //console.log(event);
//     bySamanta ? 
//       this.user.next(this.findAnswers(this.dialog.user, event)) :
//         this.samanta.next(this.findAnswers(this.dialog.samanta, event));
//   }

//   findAnswers(source: Array<sentence>, data: onTypeEnded) {
//     if(!data.answers || !data.answers.length) { return null; }
//     let answers = [];
//     data.answers.forEach((name) => {
//         source.forEach((answer) => {
//             if(answer.name === name) {
//                 answers.push(answer);
//             }
//         });
//     });  
//     return answers;
//   }

// }