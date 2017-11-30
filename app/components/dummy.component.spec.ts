import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                        from '@angular/platform-browser';
import { DebugElement }              from '@angular/core';
import { DummyComponent }            from './dummy.component';

describe('Dummy component', () => {

  let comp:    DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(()=>{
    TestBed.configureTestingModule({ declarations: [ DummyComponent ] })

    fixture = TestBed.createComponent(DummyComponent)
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });
  

  it('No title in the DOM until manually call `detectChanges`', () => {
    expect(el.textContent).toEqual('');
  });

  it('Should display default title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.mainTitle);
  });
  
  it('Should display binded title', () => {
    comp.title = 'Binded Title'
    fixture.detectChanges();
    expect(el.textContent).toContain('Binded Title');
  });

});