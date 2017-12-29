/* Angular */
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Observable } from 'rxjs';

/* Models & Constants */
import { selectItem, selected } from '../../constants/select';

@Component({
  selector: 'select-component',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

	@Input() data: Array<selectItem>;
	@Input() label: string;
	@Input() next: string;
	@Input() modificator: string;

	@Output() onItemSelected = new EventEmitter<selected>();

	private items: Array<selectItem>;

	constructor() { console.log('Select component created!')}

	onSelect(e): void {
		let data = { 
			next: e.target.attributes['data-next'].value,
			selected: e.target.attributes['data-id'].value
		}
		this.onItemSelected.emit(data);
		this.label = e.target.attributes['data-label'].value;		
	}
}