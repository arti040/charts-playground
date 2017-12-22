import {Component, Input, Output, OnInit, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';

/* Models & Constants */
import { selectItem } from '../../constants/select';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

	@Input() data: Array<selectItem>;
	@Input() label: string;
	@Input() next: string;
	@Input() modificator: string;

	@Output() onItemSelected = new EventEmitter<selectItem>();

	private items: Array<selectItem>;

	constructor() {}

	ngOnInit() {
		//console.log('select gets: ', this.data);
		//this.emitSelected();
	}

	ngOnChanges() {
		console.log('select updated:', this.data);
	}

	emitSelected() {
		this.data.forEach(element => {
			//element.selected && this.onSelect(element);
		});
	}
	
	onSelect(element) {
		let data: selectItem = { id: null };
		if(element.target) {
			data.id = element.target.attributes['data-id'].value;
			data.next = element.target.attributes['data-next'].value; 			
		}
		else {
			data.id = element.id;
			data.next = this.next;
		}
		//console.log('Emitting...');
		this.onItemSelected.emit(data);
	}
}