import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-searched-news',
  templateUrl: './searched-news.component.html',
  styleUrls: ['./searched-news.component.scss']
})
export class SearchedNewsComponent implements OnInit {

  arr: any[] = [];
  per: number;
  page: number;

  news: any = [];
  defaultImage:any = "";
  title:string;


  constructor(
    private apiCalls: ApiCallService,
    private subscription: SubscriptionService
  ) { }

  ngOnInit(): void {
    // let keywords = null;
    this.subscription.searchQ.subscribe(search => {
      // console.log(search);
      this.news = [];
      this.apiCalls.getNewsApiSearch(search, '2020-06-21').then((response: HttpResponse<any>) => {
        this.title = search == 'a'? "Home" : this.toTitleCase(search);
        if (response.status == 200) {
          // console.log(response.body);
          response.body.articles.forEach(article => {
            this.news.push(article);
          });
          // console.log(this.news);
        } else {
          console.log(response);
        }
      }).catch((e: any) => {
        console.log(e);
      });
    });
  }

  handlescroll(event) {
    console.log(event.target.scrollTop, event.target.clientHeight);
  }

  public getDate(dateTime: any) {
    let today = new Date(Date.now());
  }

  toTitleCase (str) {
    if ((str===null) || (str===''))
         return false;
    else
     str = str.toString();
  
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  

}
