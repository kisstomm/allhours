import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {ButtonModule} from 'primeng/button';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SettingsComponent} from './components/settings/settings.component';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {MenubarModule} from "primeng/menubar";
import {HomeComponent} from './components/home/home.component';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {UserListComponent} from './components/user-list/user-list.component';
import {TableModule} from "primeng/table";
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserAbsenceCreateComponent } from './components/user-absence-create/user-absence-create.component';
import {AccordionModule} from "primeng/accordion";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    HomeComponent,
    UserListComponent,
    UserCreateComponent,
    UserAbsenceCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    MenubarModule,
    MessagesModule,
    ToastModule,
    TableModule,
    AccordionModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    CheckboxModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
