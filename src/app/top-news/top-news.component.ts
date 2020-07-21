import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { HttpResponse } from '@angular/common/http';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {

  news: any = [];

  constructor(private apiCalls : ApiCallService, private subscription : SubscriptionService) { }

  ngOnInit(): void {
    this.subscription.setQ("politics");
    this.apiCalls.getHeadlines('bitcoin', '2020-06-21').then((response: HttpResponse<any>) => {
      if(response.status == 200){
        // console.log(response.body);
        response.body.articles.forEach(article => {
          this.news.push(article);
        });
        // console.log(this.news);
      } else {
        console.log(response);
      }
    }).catch ((e: any) => {
      console.log(e);
    });
  }

}
