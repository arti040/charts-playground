/* Angular */
import { Component, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

/* Models & Constants */
import { ngx } from '../../constants/ngx'; 

/* Vendors */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@Component({
  selector: 'datatable',
  template: `
    <div>
      <ngx-datatable
        [rows]="rows"
        [columns]="columns">
        
        //   <ng-template let-row="row" let-value="value">
        //     <div>Name: {{row.name.label}}, {{value}}</div>
        //   </ng-template>

        <ngx-datatable-column name="Name" [width]="300">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <div [style.backgroundColor]="value.bgColor" [style.color]="value.markColor">{{value.label}}</div>
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="gender" [width]="100">
          <ng-template let-value="value" ngx-datatable-cell-template>
            <div [style.backgroundColor]="value.bgColor" [style.color]="value.markColor">{{value}}</div>
          </ng-template>
        </ngx-datatable-column>

        </ngx-datatable>
  
    </div>
    
  `
})
export class DatatableComponent {

  @Input() data: Observable<ngx>;

  private rows = [
    { name: { label: 'Austin', bgColor: '#fc0', markColor: 'red', markTriangle: true }, gender: 'Male', company: 'Swimlane' },
    { name: { label: 'Dany', bgColor: '#111', markColor: 'white', markTriangle: false }, gender: 'Male', company: 'KFC' },
    { name: { label: 'Molly', markColor: 'green' }, gender: 'Female', company: 'Burger King' },
  ];
  private columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];
}