/* Angular */
import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

/* Models & Constants */
import { ngx } from '../../constants/ngx'; 
import { Config } from '../../app.config';

/* Vendors */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@Component({
  selector: 'datatable',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class DatatableComponent {

  @Input() data: ngx;

  constructor(private config: Config) {}

  ngOnChanges() {
    console.log(this.data);
  }
}