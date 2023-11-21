import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { NavbarMenuComponent } from './layout/navbar-menu/navbar-menu.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {UserTableComponent} from "./component/user-table/user-table.component";
import {UserAddComponent} from "./component/user-add/user-add.component";
import {AppRoutingModule} from "./app-routing.module";
import {PeopleOrganizationsComponent} from "./component/people-organizations/people-organizations.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    NavbarMenuComponent,
    UserTableComponent,
    UserAddComponent,
    PeopleOrganizationsComponent
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
