
// export interface select {
// 	group?: string,
// 	parent?: string,
// 	children?: string,
// 	name?: string,
// 	id?: string,
// 	selected?: boolean,
// 	market?: Array<any>,
// 	sharebase?: Array<string>
// }

export interface select {
	label?: string,
	next?: string,
	data: Array<selectItem>
}

export interface selectItem {
	name?: string,
	id: string
}