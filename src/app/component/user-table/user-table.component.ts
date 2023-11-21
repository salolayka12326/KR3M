import { Component } from '@angular/core';
import {IUser} from "../../models/base.models";
import {UserService} from "../../services/user/user.service";


type ColumnName = 'user' | 'email' | 'company' | 'code' | 'note' | 'delete-action'

export interface TableColumn {
  label: string,
  fieldName: ColumnName
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  page: number = 1;
  pageSize: number = 5;
  pageCount: number = 1;

  leftDots: boolean = false;
  rightDots: boolean = false;
  navBegin: number = 1;
  navEnd: number = 1;
  paginationElements: number[] = [];

  private _search: string = '';

  tableColumns: TableColumn[] = [
    { label: 'User name', fieldName: 'user' },
    { label: 'E-mail', fieldName: 'email' },
    { label: 'Company', fieldName: 'company' },
    { label: 'Code', fieldName: 'code' },
    { label: 'Note', fieldName: 'code' },
    { label: 'Action', fieldName: 'delete-action' }
  ];

  private allUsers: IUser[] = [];
  filteredUsers: IUser[] = [];

  constructor(private _usersService: UserService) {
    this._usersService.getAllUsers().subscribe(
      data => {
        this.allUsers = data;
        this.filteredUsers = data;
        this.pageCount = Math.ceil(this.filteredUsers.length / this.pageSize);
      }
    );
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    const lowerCaseQuery = value.toLowerCase();
    const res = this.allUsers.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery)
      )
    );
    this.filteredUsers = res;
    this.pageCount = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.setPage(1);
  }

  getPageOfUsers(): IUser[] {
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

    if (navEnd >= pageCount - 1 ) {
      navBegin = pageCount - page_show + 1;
      if (navEnd == pageCount - 1) {
        navBegin--;
      }
      navEnd = pageCount;
      rightDots = false;
    }
    let paginationElements: number[] = [];
    for (let i = navBegin; i <= navEnd; i++) {
      if (i>0) paginationElements.push(i);
    }

    this.navBegin = navBegin;
    this.leftDots = leftDots;
    this.rightDots = rightDots;
    this.navEnd = navEnd;
    this.paginationElements = paginationElements;


    return this.filteredUsers.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize));
  }

  setPage(num: number): IUser[] {
    this.page = num;
    return this.filteredUsers.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize));
  }

  pageInc(): IUser[] {
    if (this.page < this.pageCount) {
      this.page += 1;
      return this.filteredUsers.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize));
    }
    return this.filteredUsers.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize));
  }

  pageDec(): IUser[] {
    if (this.page > 1) {
      this.page -= 1;
      return this.filteredUsers.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize));
    }
    return this.filteredUsers.slice(((this.page - 1) * this.pageSize), (this.page * this.pageSize));
  }

  deleteUser(user: IUser) {
    this._usersService.deleteUser(user.id ? user.id : -1);
    this._usersService.getAllUsers().subscribe(
      data => {
        this.allUsers = data;
        this.filteredUsers = data;
        this.pageCount = Math.ceil(this.filteredUsers.length / this.pageSize);
      }
    );
  }

}
