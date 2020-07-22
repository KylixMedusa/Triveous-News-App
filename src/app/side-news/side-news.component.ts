import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-side-news',
  templateUrl: './side-news.component.html',
  styleUrls: ['./side-news.component.scss']
})
export class SideNewsComponent implements OnInit {

  news: any = [];
  top_arr:any[] = [];
  latest_arr:any[] = [];
  featured_arr:any[] = [];
  top_viewing:boolean = false;
  latest_viewing:boolean = true;
  featured_viewing:boolean = false;
  defaultImage:any = "../../assets/defaultimage.png";//Holds default image till the image loads

  constructor(private apiCalls : ApiCallService) { }

  ngOnInit(): void {

    //Api calls to get data
    this.apiCalls.getSideNews('a','in','popularity').then((response: HttpResponse<any>) => {
      if(response.status == 200){
        // console.log(response.body);
        response.body.articles.forEach(article => {
          article.publishedAt = moment(article.publishedAt).fromNow();

          this.top_arr.push(article);
        });
        // console.log(this.top_arr);
      } else {
        console.log(response);
      }
    }).catch ((e: any) => {
      console.log(e);
    });
    this.apiCalls.getSideNews('a','in','publishedAt').then((response: HttpResponse<any>) => {
      if(response.status == 200){
        // console.log(response.body);
        response.body.articles.forEach(article => {
          article.publishedAt = moment(article.publishedAt).fromNow();

          this.latest_arr.push(article);
        });
        // console.log(this.latest_arr);
      } else {
        console.log(response);
      }
    }).catch ((e: any) => {
      console.log(e);
    });
    this.apiCalls.getSideNews('corona','in',null).then((response: HttpResponse<any>) => {
      if(response.status == 200){
        // console.log(response.body);
        response.body.articles.forEach(article => {
          article.publishedAt = moment(article.publishedAt).fromNow();

          this.featured_arr.push(article);
        });
        // console.log(this.featured_arr);
      } else {
        console.log(response);
      }
    }).catch ((e: any) => {
      console.log(e);
    });
  }

  //Handles the viewing of the top, latest and featured
  addactive(event){
    for(let item of event.target.parentElement.childNodes){
      item.classList.remove("active");
    }
    // console.log(event);
    if(event.srcElement.innerHTML=="Top"){
        this.top_viewing = true;
        this.latest_viewing = false;
        this.featured_viewing = false;
    }
    else if(event.srcElement.innerHTML=="Latest"){
      this.top_viewing = false;
      this.latest_viewing = true;
      this.featured_viewing = false;
    }
    else{
      this.top_viewing = false;
      this.latest_viewing = false;
      this.featured_viewing = true;
    }
    event.target.classList.add("active");
  }
}
