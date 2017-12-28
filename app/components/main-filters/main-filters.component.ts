/* Angular */
import { Component, Output, EventEmitter } from '@angular/core';

/* Services */
import { SelectsSvc } from '../../providers/selects.service';

/* Models & Constants */
import { select, selectItem, chartDataQuery } from '../../constants/select';
import { labels } from '../../constants/labels';


@Component({
  selector: 'main-filters',
  templateUrl: './main-filters.component.html',
  providers: [SelectsSvc]
})
export class MainFiltersComponent {

  @Output() onAllFiltersSelected = new EventEmitter<chartDataQuery>()

  private raw: Array<any>;
  private alive: boolean = true;
  private selects: Array<select> = [];

  // 28.12.2017 This is hardcoded value (monthly). Don't know what will be later...
  private query: chartDataQuery = new ChartDataQuery(labels.monthly, null, null, null, null);
  
  constructor(private _selectsSvc: SelectsSvc) {
    console.log('MainFilters component created!'); 
  }

  ngOnInit() {
    this.getMainNodes();
  }
  
  /* Event handlers */
  private loadNextSelectData(e) {
    switch(e.next) {
      case labels.kpi:
        this.resetSelectsState(); // clear rest of the fileters first     

        this.query.product_line = e.selected;
        this.selects[1] = this.getKpis(this.raw, e.selected);
      break;
      case labels.market:
        this.query.kpi = e.selected;
        this.selects[2] = this.getMarkets(this.raw, this.query.product_line, e.selected);
      break;
      case labels.sharebase:
        this.query.market = e.selected;
        this.selects[3] = this.getSharebases(this.raw, this.query.product_line, this.query.kpi, e.selected);
      break;
      default:
        this.query.share_base = e.selected;
        this.onAllFiltersSelected.emit(this.query);
      break;
    }
  }

  
  /* Helpers */
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
  private getMainNodes() {
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

export class ChartDataQuery {
  constructor(
    public frequency: string, 
    public product_line: string,
    public kpi: string,
    public market: string,
    public share_base: string 
  ) {}
}