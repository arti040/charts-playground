export interface chartRDataItemModel {
	DATE: string,
	MARKET: string,
	BRAND: string,
	MEASURE: string,
	TARGET_VAR: number,
	BREAKPOINT_INDICATOR: number,
	OUTLIER_INDICATOR: number,
	LOCAL_STANDARD_ERROR?: number,
	LOCAL_OUTLIER_INDICATOR: number,
	CI_INDICATOR: number,
	INTERCEPT?: number,
	SLOPE?: number,
	TREND?: number,
	BREAKPOINT_SHIFTS_ABS?: number,
	EARLY_WARNING_INDICATOR: number
}