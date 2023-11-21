import { Component } from '@angular/core';
import { TableColumn } from "../user-table/users-table.component";
import { IPeopleOrganizationUnit, TagName } from "../../models/base.models";
import { PeopleOrganizationsService } from "../../services/people-organizations/people-organizations.service";

@Component({
  selector: 'app-people-organisations-table',
  templateUrl: './people-organization-table.component.html',
  styleUrls: ['./people-organization-table.component.scss']
})
export class PeopleOrganizationTableComponent
{
  page: number = 1;
  pageSize: number = 5;
  pageCount: number = 1;

  leftDots: boolean = false;
  rightDots: boolean = false;
  navBegin: number = 1;
  navEnd: number = 1;
  paginationElements: number[] = [];

  firstShown: number = 1;
  lastShown: number = 1;

  tableColumns: TableColumn[] = [
    { label: 'Summary', fieldName: 'user' },
    { label: 'E-mail address', fieldName: 'email' },
    { label: 'Phone number', fieldName: 'company' },
    { label: 'Location', fieldName: 'code' },
    { label: 'Tags', fieldName: 'code' },
  ];

  tagList: string[] = ['No tag', 'Important', 'Customer', 'Lead', 'Supplier'];
  _selectedTag: string = 'No tag';
  allPeopleOrganizations: IPeopleOrganizationUnit[] = [];
  filteredPeopleOrganizations: IPeopleOrganizationUnit[] = [];

  constructor(private _peopleOrganizationsService: PeopleOrganizationsService) {
    this._peopleOrganizationsService.getAllPeopleOrganizations().subscribe(
      data => {
        this.allPeopleOrganizations = data;
        this.filteredPeopleOrganizations = data;
        this.pageCount = Math.ceil(this.filteredPeopleOrganizations.length / this.pageSize);
      }
    );
  }

  get selectedTag(): string {
    return this._selectedTag;
  }

  set selectedTag(value: string) {
    console.log(this.allPeopleOrganizations, this.filteredPeopleOrganizations)
    if (value != 'No tag') {
      this._selectedTag = value;
      this.filteredPeopleOrganizations = this.allPeopleOrganizations.filter( item =>
        item.tags?.includes( <TagName> value )
      );
      this.pageCount = Math.ceil(this.filteredPeopleOrganizations.length / this.pageSize);
      this.setPage(1);
    } else {
      this.filteredPeopleOrganizations = this.allPeopleOrganizations;
      this.pageCount = Math.ceil(this.filteredPeopleOrganizations.length / this.pageSize);
      this.setPage(1);
    }
  }

  clearSearch() {
    this.selectedTag = 'No tag';
  }

  getPageOfPeopleOrganizations(): IPeopleOrganizationUnit[] {
    let pageCount: number = this.pageCount;
    let pageActive: number = this.page;
    let page_show: number = 3;
    let range = Math.floor(page_show / 2);
    let navBegin = pageActive - range;
    if (page_show % 2 == 0) {
      navBegin++;
    }
    let navEnd = pageActive + range;
    let leftDots = true;
    let rightDots = true;

    if (navBegin <= 2) {
      navEnd = page_show;
      if (navBegin == 2) {
        navEnd++;
      }
      navBegin = 1;
      leftDots = false;
    }

    if (navEnd >= pageCount - 1) {
      navBegin = pageCount - page_show + 1;
      if (navEnd == pageCount - 1) {
        navBegin--;
      }
      navEnd = pageCount;
      rightDots = false;
    }

    let paginationElements: number[] = [];
    for (let i = navBegin; i <= navEnd; i++) {
      if (i > 0) paginationElements.push(i);
    }

    this.navBegin = navBegin;
    this.leftDots = leftDots;
    this.rightDots = rightDots;
    this.navEnd = navEnd;
    this.paginationElements = paginationElements;

    const res: IPeopleOrganizationUnit[] = this.getPageContent();
    const length: number = res.length;
    this.firstShown = res[0]?.id ? res[0].id : 1;
    const last: number | undefined = res[length - 1]?.id;
    this.lastShown = last ? last : 1;
    return res;
  }

  setPage(num: number): IPeopleOrganizationUnit[] {
    this.page = num;
    return this.getPageContent();
  }

  pageInc(): IPeopleOrganizationUnit[] {
    if (this.page < this.pageCount) {
      this.page += 1;
      return this.getPageContent();
    }
    return this.getPageContent();
  }

  pageDec(): IPeopleOrganizationUnit[] {
    if (this.page > 1) {
      this.page -= 1;
      return this.getPageContent();
    }
    return this.getPageContent();
  }

  private getPageContent(): IPeopleOrganizationUnit[]
  {
    return this.filteredPeopleOrganizations.slice( ( ( this.page - 1 ) * this.pageSize ), ( this.page * this.pageSize ) );
  }
}
