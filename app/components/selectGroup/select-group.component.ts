import {Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectComponent } from '../select/select.component';
import { Subject } from 'rxjs/Subject';

/* Models & Constants */
import { select } from '../../constants/select';

@Component({
  selector: 'select-group-component',
  templateUrl: './select-group.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGroupComponent {

	@Input() data: Observable<Array<select>>;
	@Input() modificator: string;

	@Output() onSingleItemSelected = new EventEmitter<select>();
	@Output() onAllItemsSelected = new EventEmitter<select>();

	constructor() {}

	ngOnInit() {}

	ngOnChanges() {
		console.log('group updated: ', this.data);
	}
	
	onAllItemsSelectedHandler() {
		this.onAllItemsSelected.emit();
	}

	getSelectedValue(event) {
		console.log('group sends: ', event);
		this.onSingleItemSelected.emit(event);
	}
}