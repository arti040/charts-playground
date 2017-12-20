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

	@Input() data: Array<select>;
	@Input() label: string;
	@Input() modificator: string;

	@Output() onItemSelected = new EventEmitter<select>();

	private items: Array<select>;

	constructor() {}

	ngOnInit() {
		console.log('select gets: ', this.data);
		this.emitSelected();
	}

	emitSelected() {
		this.data.forEach(element => {
			element.selected && this.onSelect(element);
		});
	}
	
	onSelect(element) {
		let data: select = {}
		if(element.target) {
			data.children = element.target.attributes['data-children'].value;
			data.id = element.target.attributes['data-id'].value
		}
		else {
			data.children = element.children;
			data.id = element.id;
			data.parent = element.parent;
		}
		this.onItemSelected.emit(data);
	}
}