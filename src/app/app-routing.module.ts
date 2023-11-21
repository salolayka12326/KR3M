import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserTableComponent} from "./component/user-table/user-table.component";
import {UserAddComponent} from "./component/user-add/user-add.component";
import {PeopleOrganizationsComponent} from "./component/people-organizations/people-organizations.component";

const routes: Routes = [
  {
    path: '',
    component: UserTableComponent
  },
  {
    path: 'add',
    component: UserAddComponent
  },
  {
    path: 'organizations',
    component: PeopleOrganizationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
