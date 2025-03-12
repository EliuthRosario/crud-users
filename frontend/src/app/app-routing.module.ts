import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormEditComponent } from './components/user-form-edit/user-form-edit.component';
import { MainViewComponent } from './components/main-view/main-view.component';

const routes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'user-form-edit/:idUsuario', component: UserFormEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
