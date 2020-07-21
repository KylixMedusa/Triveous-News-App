import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionService } from '../services/subscription.service';
import * as moment from 'moment';

@Component({
  selector: 'app-searched-news',
  templateUrl: './searched-news.component.html',
  styleUrls: ['./searched-news.component.scss']
})
export class SearchedNewsComponent implements OnInit {


  apicall:boolean = false;
  news: any = [];
  defaultImage:any = "../../assets/defaultimage.png";
  title:string;


  constructor(
    private apiCalls: ApiCallService,
    private subscription: SubscriptionService,
  ) { }

  ngOnInit(): void {
    // let keywords = null;
    this.subscription.searchQ.subscribe(search => {
      this.apicall = true;
      // console.log(search);
      this.news = [];
      this.apiCalls.getNewsApiSearch(search, '2020-06-21').then((response: HttpResponse<any>) => {
        this.title = search == 'a'? "Home" : this.toTitleCase(search);
        this.apicall = false;
        if (response.status == 200) {
          // console.log(response.body);
          response.body.articles.forEach(article => {
            article.publishedAt = moment(article.publishedAt).fromNow();
            this.news.push(article);
          });
          this.apicall = false;
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

  toTitleCase (str) {
    if ((str===null) || (str===''))
         return false;
    else
     str = str.toString();
  
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  
  

}
