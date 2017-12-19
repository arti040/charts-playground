import {Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectComponent } from '../select/select.component';

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

	private items: Array<select>;

	constructor() {}

	ngOnInit() {}
	
	onAllItemsSelected() {
		this.onItemsSelected.emit();
	}

	getSelectedValue(event) {
		console.log(event);
	}
}