import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BoardModule} from "./board/board.module";
import {AuthModule} from "./auth/auth.module";


// HttpClient
import {HttpClientModule} from "@angular/common/http";
import {MainModule} from "./main/main.module";
import { UserComponent } from './user/user.component';
import { RuleComponent } from './rule/rule.component';
import {RuleModule} from "./rule/rule.module";


// Routing setup

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BoardModule,
    AuthModule,
    HttpClientModule,
    MainModule,
    RuleModule,
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
