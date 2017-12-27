/* Angular */
import { Component } from '@angular/core';

/* Services */
import { SelectsSvc } from '../../providers/selects.service';

/* Models & Constants */
import { select, selectItem } from '../../constants/select';
import { labels } from '../../constants/labels';


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

  private query: any = {}

  /* reimplementiation*/
  private selects: Array<select> = [];


  constructor(private _selectsSvc: SelectsSvc) {
    console.log('MainFilters component created!'); 
  }

  ngOnInit() {
    this.loadRawData();
  }
  
  /* Event handlers */

  private loadNextSelectData(e) {
    switch(e.next) {
      case labels.kpi:
        this.resetSelectsState(); // clear rest of the fileters first     

        this.query.productline_id = e.selected;
        this.selects[1] = this.getKpis(this.raw, e.selected);
      break;
      case labels.market:
        this.query.kpi_id = e.selected;
        this.selects[2] = this.getMarkets(this.raw, this.query.productline_id, e.selected);
      break;
      case labels.sharebase:
        this.selects[3] = this.getSharebases(this.raw, this.query.productline_id, this.query.kpi_id, e.selected);
      break;
    }
  }

  
  /* helpers */
  private emptySelect(label) {
    let item: select = {
      label: label,
      data: []
    }
    return item; 
  }

  private resetSelectsState(all?) {  
    if(all) {
      this.selects = [];
      this.selects.push(
        this._selectsSvc.getMainNodes(this.raw), 
        this.emptySelect(labels.kpi), 
        this.emptySelect(labels.market), 
        this.emptySelect(labels.sharebase)
      );
    } 
    else {
      this.selects[1] = this.emptySelect(labels.kpi);
      this.selects[2] = this.emptySelect(labels.market);
      this.selects[3] = this.emptySelect(labels.sharebase);
    }
  }

  /* API handlers */
  private loadRawData() {
    this._selectsSvc.getFilters()
    .takeWhile(() => this.alive)
    .subscribe(res => {
      this.raw = res.json();
      this.resetSelectsState(true);
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