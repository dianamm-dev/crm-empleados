import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AuthModule,
    FormsModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
