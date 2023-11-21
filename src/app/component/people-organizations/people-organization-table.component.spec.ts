import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleOrganizationTableComponent } from './people-organization-table.component';

describe('PeopleOrganizationsComponent', () => {
  let component: PeopleOrganizationTableComponent;
  let fixture: ComponentFixture<PeopleOrganizationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleOrganizationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleOrganizationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
