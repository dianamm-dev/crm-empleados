import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AddEmployeeComponent,
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
