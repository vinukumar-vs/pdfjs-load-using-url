import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdfViewComponent } from './main/pdf-view/pdf-view.component';


const routes: Routes = [
  { path: 'pdf', component: PdfViewComponent },
  { path: '', redirectTo: '/pdf', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
