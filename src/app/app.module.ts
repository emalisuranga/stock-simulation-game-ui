import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/game-login/game-login.component';
import { GameBoardComponent } from './components/game-board/game-board.component';


const appRoutes: Routes = [
  { path: 'game-login', component: LandingPageComponent },
  { path: 'game-board', component: GameBoardComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GameBoardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
