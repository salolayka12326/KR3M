import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersTableComponent } from "./component/user-table/users-table.component";
import { UserAddComponent } from "./component/user-add/user-add.component";
import { PeopleOrganizationTableComponent } from "./component/people-organizations/people-organization-table.component";

const routes: Routes = [
  {
    path: '',
    component: UsersTableComponent
  },
  {
    path: 'add',
    component: UserAddComponent
  },
  {
    path: 'organizations',
    component: PeopleOrganizationTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
