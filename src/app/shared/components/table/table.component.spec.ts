import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleDataType, TableWrapperComponent } from 'src/test-helpers/wrappers/table-wrapper.component';
import { TableComponent } from './table.component';




describe('TableComponent', () => {
  let component: TableComponent<ExampleDataType> | null
  let fixture: ComponentFixture<TableComponent<ExampleDataType>>
  let changeDetector: ChangeDetectorRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableWrapperComponent, TableComponent],
    })
      .compileComponents()

    fixture = TestBed.createComponent(TableComponent<ExampleDataType>)
    component = fixture.componentInstance
    fixture.detectChanges()
    changeDetector = fixture.componentRef.injector.get(ChangeDetectorRef)
  })


  it('should create', () => {
    expect(component).toBeTruthy()
  })


  it('should render headers', () => {
    if (component) {
      component.headers = ['header1', 'header2', 'header3']
      component.ngOnInit()

      changeDetector.detectChanges()
      const tableElement: HTMLElement = fixture.nativeElement
      expect(tableElement.querySelectorAll('th')?.length).toBe(3)
      component.headers.forEach((header: string, index: number) =>
        expect(tableElement.querySelectorAll('th')[index].textContent).toContain(header)
      )
    }
  })


  it('should render data and correct template', () => {
    const fixture = TestBed.createComponent(TableWrapperComponent)
    const wrapperComponent = fixture.componentInstance

    wrapperComponent.data = [{
      name: 'Test Name',
      lastName: 'Test Last Name'
    }]

    component = wrapperComponent.appComponentRef
    fixture.detectChanges()
    changeDetector.detectChanges()

    expect(fixture.nativeElement.querySelector('tr')).toBeTruthy()
    expect(fixture.nativeElement.querySelectorAll('td').length).toEqual(2)
    expect(fixture.nativeElement.querySelectorAll('td')[0].textContent)
      .toContain(wrapperComponent.data[0].name)
  })


  it('should show loading label', () => {
    if (component) {
      component.loading = true
      component.loadingLabel = 'loading'
      component.ngOnInit()
      changeDetector.detectChanges()

      const tableElement: HTMLElement = fixture.nativeElement
      expect(tableElement.querySelector('div.label')?.textContent).toContain(component.loadingLabel)
    }
  })

})
