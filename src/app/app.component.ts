import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cinguetto';

  firebaseServ = inject(FirebaseService);

  constructor() {
    this.firebaseServ.init();
    this.firebaseServ.getAllCinguettiii();
  }
}
