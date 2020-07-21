import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  listelement:any;
  searchvalue:string;

  constructor(
    private subscription : SubscriptionService
  ) { }

  ngOnInit(): void {
    this.subscription.setQ("a");
    this.listelement = document.getElementById("home");
    this.listelement.classList.add("active");
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
  addactive(event){
    var node = event.srcElement;
    node.classList.add("active");
    this.listelement.classList.remove("active");
    this.listelement = node;
    if(event.srcElement.innerText.toLowerCase() !="home")
      this.subscription.setQ(event.srcElement.innerText.toLowerCase());
    else
      this.subscription.setQ('a');
  }
  searchnews(){
    if(this.searchvalue!="" && this.searchvalue){
      this.subscription.setQ(this.searchvalue);
      this.listelement.classList.remove("active");
    }

  }

}
