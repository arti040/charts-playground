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

  constructor(private config: Config) { console.log('Table component created.'); }
  // ngOnChanges() { console.log(this.data); }
}


// data object descriptions:
// -------------------------
//
// title - sets title for ngx table
// scrollable - sets ngx' scrollableV property
// col_sortable - sets sortable flag for each ngx' column
// center - if true, column is centered
// col_width - sets width for each ngx' column
// bgColor, color - sets colors for each ngx` table cell (as atomic class - see colors.atom)
// action - defines action for each ngx' table cell
// marked - adds a red traingle via CSS class to marked ngx' table cell 
// (they sometimes need it - ask Tomek Zdunek for details)