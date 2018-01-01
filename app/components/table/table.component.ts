// === Table Component
// @name DatatableComponent
// @desc It's a wrapper for ngx-datatable component
// @inputs data: ngx
// @outputs onLinkClick: event<string> (were string parameter is an action to resolve)

/* Angular */
import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
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
  @Output() onLinkClick: EventEmitter<string> = new EventEmitter();

  constructor(private config: Config) { console.log('Table component created.'); }

  handleClick(e:string) {
    this.onLinkClick.emit(e);
  }

}


// data object description:
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
// icon - icon as a google-material-icons CSS class
// iconSize - size of an icon (px) or default one from app.config file
// iconColor - color of an icons as string - see colors.atom
// padding - padding for first row item
// frozen - pinning of columns
