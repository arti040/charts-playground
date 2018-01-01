// === Selects
// @desc Interfaces related to select/main-selects components.

/* data structure for select-component data Input */
export interface select {
	label?: string,
	next?: string,
	data: Array<selectItem>
}

/* data structure for Output in select-component */
export interface selected {
	next: string,
	selected: string
}

/* data structure for an item in select's data array */
export interface selectItem {
	name?: string,
	id: string
}

/* data structure send to the server when all filters are set */
export interface chartDataQuery {
	frequency: string,
	product_line: string,
	kpi: string,
	market: string,
	share_base: string
}