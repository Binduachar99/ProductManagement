import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { PhonesComponent } from './admin/phones/phones.component';




const routes: Routes = [
  { path: 'admin/users', component: UsersComponent },
  { path: 'admin/phones', component: PhonesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
