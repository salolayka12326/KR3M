import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { IPeopleOrganizationUnit } from "../../models/base.models";

@Injectable({
  providedIn: 'root'
})
export class PeopleOrganizationsService {

  users: IPeopleOrganizationUnit[] = [];

  constructor(public httpClient: HttpClient) {
  }

  public getAllPeopleOrganizations(): Observable<IPeopleOrganizationUnit[]> {
    if (this.users && this.users.length > 0) {
      return of(this.users);
    } else {
      return this.httpClient.get<IPeopleOrganizationUnit[]>('/assets/people-organizations.json').pipe(
        tap(data => {
          this.users = data;
        })
      );
    }
  }
}
