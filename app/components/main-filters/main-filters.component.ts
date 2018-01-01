/* Angular */
import { Component, Input, Output, EventEmitter,
  trigger, state, animate, transition, style } from '@angular/core';

/* Services */
import { SelectsSvc } from '../../providers/selects.service';

/* Models & Constants */
import { select, selectItem, chartDataQuery } from '../../constants/select';
import { labels } from '../../constants/labels';


@Component({
  selector: 'main-filters',
  templateUrl: './main-filters.component.html',
  providers: [SelectsSvc],
  animations: [
    trigger('visibilityChanged', [
      state('shown' , style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => shown', animate('0.5s')),
    ])
  ]
})
export class MainFiltersComponent {

  @Input() isVisible: boolean = false;
  @Output() onAllFiltersSelected = new EventEmitter<chartDataQuery>()
  @Output() onFiltersReset = new EventEmitter();

  private raw: Array<any>;
  private alive: boolean = true;
  private selects: Array<select> = [];
  private visibility: string = 'hidden';

  // 28.12.2017 This is hardcoded value (monthly). Don't know what will be later...
  private query: chartDataQuery = new ChartDataQuery(labels.monthly, null, null, null, null);
  
  constructor(private _selectsSvc: SelectsSvc) {
    console.log('MainFilters component created!'); 
  }

  ngOnInit(): void {
    this.getMainNodes();
  }

  ngOnChanges() {
    this.visibility = this.isVisible ? 'shown' : 'hidden';
  }
  
  /* Event handlers */
  private loadNextSelectData(e): void {
    switch(e.next) {
      case labels.kpi:
        this.onFiltersReset.emit();
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
  private emptySelect(label): select {
    let item: select = {
      label: label,
      data: []
    }
    return item; 
  }

  /* resetSelectsState() generates 4 selectes as main filters, were 3 of them are empty 
   * OR resets states of those last 3, when first is being changed. 
   */
  private resetSelectsState(all?): void {  
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
  private getMainNodes(): void {
    this._selectsSvc.getFilters()
    .takeWhile(() => this.alive)
    .subscribe(res => {
      this.raw = res.json();
      this.resetSelectsState(true);
    });
  }

  private getKpis(from, id): any {
    return this._selectsSvc.getKpiFilters(from, id);
  }

  private getMarkets(from, id, kpi_id): any {
    return this._selectsSvc.getMarketFilters(from, id, kpi_id);
  }

  private getSharebases(from, id, kpi_id, market_id):any {
    return this._selectsSvc.getSharebaseFilters(from, id, kpi_id, market_id);
  }
}

/* Simple class for generating empty query object */
export class ChartDataQuery {
  constructor(
    public frequency: string, 
    public product_line: string,
    public kpi: string,
    public market: string,
    public share_base: string 
  ) {}
}