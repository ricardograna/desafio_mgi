import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Desafio';
}
