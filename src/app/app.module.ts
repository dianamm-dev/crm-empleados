import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AuthGuard } from './auth/guards/auth/guards/role.guard';
import { PasswordComponent } from './auth/components/password/password.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AuthModule,
    FormsModule,
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    PasswordComponent,
    CommonModule
  ],
  providers: [AuthGuard],
  bootstrap: [] 
})
export class AppModule { }
