import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTreinoComponent } from './components/page/form-treino/form-treino.component';
import { UserDashComponent } from './components/page/user-dash/user-dash.component';

const routes: Routes = [
  { path: '', component: FormTreinoComponent },
  { path: 'users', component: UserDashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
