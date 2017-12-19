import {Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';

/* Models & Constants */
import { select } from '../../constants/select';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

	@Input() data: Observable<Array<select>>
	@Input() modificator: string

	@Output() onItemSelected = new EventEmitter<select>();

	private items: Array<{ name: string, value: number }>;

	constructor() {}
	
	onSelect(event) {
		this.onItemSelected.emit({ value: event.target.value });
	}
}