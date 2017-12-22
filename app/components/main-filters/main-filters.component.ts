/* Angular */
import { Component } from '@angular/core';

/* Services */
import { SelectsSvc } from '../../providers/selects.service';

/* Models & Constants */
import { select, selectItem } from '../../constants/select';


@Component({
  selector: 'main-filters',
  templateUrl: './main-filters.component.html',
  providers: [SelectsSvc]
})
export class MainFiltersComponent {

  private raw: Array<any>;
  private alive: boolean = true;

  private productlines: select;
  private kpis: select;
  private markets: select;
  private sharebases: Array<string> = [];

  private selectedProductline: string;
  private selectedKpi: string;
  private selectedMarket: string;
  private selectedSharebase: string;

  private selectedProductlineLabel: string;
  private selectedKpiLabel: string;
  private selectedMarketLabel: string;
  private selectedSharebaseLabel: string;

  private query: any;

  constructor(private _selectsSvc: SelectsSvc) {
    console.log('MainFilters component created!'); 
  }

  ngOnInit() {
    this.loadRawData();
  }
  
  /* Event handlers */
  private onSelectProductline(event) {
    this.resetAllSelects();    
    this.selectedProductline = event.target.attributes['data-id'].value;
    this.selectedProductlineLabel = event.target.attributes['data-name'].value;
    this.kpis = this.getKpis(this.raw, this.selectedProductline);
  }

  private onSelectKpi(event) {
    this.selectedKpi = event.target.attributes['data-id'].value;
    this.selectedKpiLabel = event.target.attributes['data-name'].value;
    this.markets = this.getMarkets(this.raw, this.selectedProductline, this.selectedKpi);
  }

  private onSelectMarket(event) {
    this.selectedMarket = event.target.attributes['data-id'].value;
    this.selectedMarketLabel = event.target.attributes['data-name'].value;
    this.sharebases = this.getSharebases(this.raw, this.selectedProductline, this.selectedKpi, this.selectedMarket);
  }

  private onSelectSharebase(event) {
    this.selectedSharebase = event.target.attributes['data-id'].value;
    this.selectedSharebaseLabel = event.target.attributes['data-name'].value;
    console.log('All selected! Voila!');
  }

  private resetAllSelects() {
    this.resetSelectData();
    this.resetLabels();
    this.resetSelected()   
  }

  private resetSelectData() {
    this.kpis = null;
    this.markets = null;
    this.sharebases = [];
  }

  private resetSelected() {
    this.selectedKpi = null
    this.selectedMarket = null;
    this.selectedSharebase = null;
  }

  private resetLabels() {
    this.selectedKpiLabel = null
    this.selectedMarketLabel = null;
    this.selectedSharebaseLabel = null;
  }

  /* API handlers */
  private loadRawData() {
    this._selectsSvc.getFilters()
    .takeWhile(() => this.alive)
    .subscribe(res => {
      this.raw = res.json();
      this.productlines = this._selectsSvc.getMainNodes(this.raw);
    });
  }

  private getKpis(from, id) {
    return this._selectsSvc.getKpiFilters(from, id);
  }

  private getMarkets(from, id, kpi_id) {
    return this._selectsSvc.getMarketFilters(from, id, kpi_id);
  }

  private getSharebases(from, id, kpi_id, market_id) {
    return this._selectsSvc.getSharebaseFilters(from, id, kpi_id, market_id);
  }
}