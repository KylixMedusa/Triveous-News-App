import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searched-news',
  templateUrl: './searched-news.component.html',
  styleUrls: ['./searched-news.component.scss']
})
export class SearchedNewsComponent implements OnInit {

  arr:any[] = [];
  per:number;
  page:number;



  constructor() { }

  ngOnInit(): void {
  }

  handlescroll(event){
    console.log(event.target.scrollTop,event.target.clientHeight);
  }

}
