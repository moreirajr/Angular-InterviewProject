import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Authenthication } from '@app/_auth/authenthication';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [Authenthication] },
  { path: 'login', component: LoginComponent },
  { path: 'produto', component: ProdutoListComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }