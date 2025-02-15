import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserCreateComponent} from "./components/user-create/user-create.component";
import {UserAbsenceCreateComponent} from "./components/user-absence-create/user-absence-create.component";
import {AbsenceListComponent} from "./components/absence-list/absence-list.component";
import {AbsenceEditComponent} from "./components/absence-edit/absence-edit.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'user-create', component: UserCreateComponent},
  {path: 'user-absence-create/:id', component: UserAbsenceCreateComponent},
  {path: 'absence-list', component: AbsenceListComponent},
  {path: 'absence-edit/:id', component: AbsenceEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
