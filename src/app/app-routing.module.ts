import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTreinoComponent } from './components/page/form-treino/form-treino.component';

const routes: Routes = [
  { path: '', component: FormTreinoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
