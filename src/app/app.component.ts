import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./ui/header/header.component";
import { SidenavComponent } from './ui/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PracticeApp';
}
