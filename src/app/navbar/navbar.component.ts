import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  opennavbar(){
    var node = document.getElementById('wrapper');
    if(node.style.height != "max-content")
      node.style.height = "max-content"; 
    else
      node.style.height = "0px";
  }
  checkwrapper(){
    var node = document.getElementById('wrapper');
    if(window.innerWidth > 1000 )
      node.style.height = "100%"; 
    else
      node.style.height = "0px";
  }

}
