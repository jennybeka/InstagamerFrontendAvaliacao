import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component'
import { PostsComponent } from './components/posts/posts.component'
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: 'instagamer/home/:page', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/instagamer/login', pathMatch: 'full' },
  { path: 'instagamer/register', component: RegisterComponent },
  { path: 'instagamer/login', component: LoginComponent },
  { path: 'instagamer/profile/:page', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'instagamer/posts/all/:page', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'instagamer/posts/all/:page/:idFriend', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'instagamer/home/:page/:idFriend', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'instagamer/follow/:idFriend', component: PostsComponent, canActivate: [AuthGuard] },

];
/** Routerlink não está bem executado(por isso tive que fazer rotas iguais e acrescentar 
 * parametros que somavam ao link ja existente de rota ***TODO)
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
