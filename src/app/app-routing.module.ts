import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleQueryComponent } from './single-query/single-query.component';
import { BatchQueryComponent } from './batch-query/batch-query.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'single-query', component: SingleQueryComponent },
  { path: 'batch-query', component: BatchQueryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
