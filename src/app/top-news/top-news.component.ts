import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../services/api-call.service';
import { HttpResponse } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})
export class TopNewsComponent implements OnInit {

  news: any = [];
  defaultImage:any = "../../assets/defaultimage.png";

  constructor(private apiCalls : ApiCallService) { }

  ngOnInit(): void {
    this.apiCalls.getHeadlines('in','','',4).then((response: HttpResponse<any>) => {
      if(response.status == 200){
        // console.log(response.body);
        response.body.articles.forEach(article => {
          article.publishedAt = moment(article.publishedAt).fromNow();
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
  loadimage(article,event){
    event.srcElement.src = article.urlToImage;
  }

}
