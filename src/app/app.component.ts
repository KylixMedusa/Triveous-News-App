import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Triveous-news-app';

  //navbarcheck() function makes the navbae sticky i.e. maked it fixed to the top for handier use
  navbarcheck(){
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    if(window.pageYOffset > sticky + 10){//10 is added for smooth decection of the component i.e. adds extra margin before making it sticky
      navbar.classList.add("sticky");
    }
    else{
      navbar.classList.remove("sticky");
    }
  }

}
