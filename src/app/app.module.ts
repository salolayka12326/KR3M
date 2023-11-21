import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarMenuComponent } from './layout/navbar-menu/navbar-menu.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { UsersTableComponent } from "./component/user-table/users-table.component";
import { UserAddComponent } from "./component/user-add/user-add.component";
import { AppRoutingModule } from "./app-routing.module";
import { PeopleOrganizationTableComponent } from "./component/people-organizations/people-organization-table.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarMenuComponent,
    UsersTableComponent,
    UserAddComponent,
    PeopleOrganizationTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
