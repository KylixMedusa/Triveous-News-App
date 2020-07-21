import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Triveous-news-app';
  navbarcheck(){
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    if(window.pageYOffset > sticky + 10){
      navbar.classList.add("sticky");
    }
    else{
      navbar.classList.remove("sticky");
    }
  }
}
