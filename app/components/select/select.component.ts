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

	@Input() data: Observable<Array<select>>;
	@Input() label: string;
	@Input() modificator: string;

	@Output() onItemSelected = new EventEmitter<select>();

	constructor() {}

	ngOnInit() {
		console.log('select gets: ', this.data);
	}
	
	onSelect(event) {
		this.onItemSelected.emit({ 
			group: event.target.attributes['data-group'].value, 
			id: event.target.attributes['data-id'].value 
		});
	}
}