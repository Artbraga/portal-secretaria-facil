import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/interceptors/authGuard';
import { AlterarSenhaRoute, ConsultarTurmaRoute, FichaAlunoRoute, FichaTurmaRoute, NotasTurmaRoute } from './model/enums/constants';
import { FichaAlunoComponent } from './views/ficha-aluno/ficha-aluno.component';
import { FichaTurmaComponent } from './views/ficha-turma/ficha-turma.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NotasTurmaComponent } from './views/notas-turma/notas-turma.component';
import { TabelaTurmaComponent } from './views/tabela-turma/tabela-turma.component';
import { AlteraSenhaComponent } from './views/altera-senha/altera-senha.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: ConsultarTurmaRoute, component: TabelaTurmaComponent, canActivate: [AuthGuard] },
  { path: FichaTurmaRoute, component: FichaTurmaComponent, canActivate: [AuthGuard] },
  { path: NotasTurmaRoute, component: NotasTurmaComponent, canActivate: [AuthGuard] },
  { path: FichaAlunoRoute, component: FichaAlunoComponent, canActivate: [AuthGuard] },
  { path: AlterarSenhaRoute, component: AlteraSenhaComponent, canActivate: [AuthGuard] },
  { path: 'entrar', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
