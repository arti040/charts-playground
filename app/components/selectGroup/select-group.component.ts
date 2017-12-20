import {Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectComponent } from '../select/select.component';
import { Subject } from 'rxjs/Subject';

/* Models & Constants */
import { select } from '../../constants/select';

@Component({
  selector: 'select-group-component',
  templateUrl: './select-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectGroupComponent {

	@Input() data: Observable<Array<select>>
	@Input() modificator: string

	@Output() onItemsSelected = new EventEmitter<select>();

	constructor() {}

	ngOnInit() {}
	
	onAllItemsSelected() {
		this.onItemsSelected.emit();
	}

	getSelectedValue(event) {
		console.log(event);
	}
}