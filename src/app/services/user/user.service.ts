import { Injectable } from '@angular/core';
import { IUser } from "../../models/base.models";
import { Observable, of, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: IUser[] = [];

  constructor(public httpClient: HttpClient) {
  }

  public getAllUsers(): Observable<IUser[]> {
    if (this.users && this.users.length > 0) {
      return of(this.users);
    } else {
      return this.httpClient.get<IUser[]>('/assets/user.json').pipe(
        tap(data => {
          this.users = data;
        })
      );
    }
  }

  public addUser(contact: IUser) {
    this.users.push(contact);
  }

  public deleteUser(id: number): IUser[] {
    this.users =  this.users.filter(user => user.id !== id);
    return this.users;
  }
}
