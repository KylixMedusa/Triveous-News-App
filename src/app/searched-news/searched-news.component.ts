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


  apicall:boolean = false;//To view loader during api call
  news: any = [];//To hold all the 20 news per page
  defaultImage:any = "../../assets/defaultimage.png"; //To hold default image before load
  title:string;
  pagecount: number = 1;
  rowcount: number = 20;
  pagelength:number;
  newsall = new Map();
  keyword: any;


  constructor(
    private apiCalls: ApiCallService,
    private subscription: SubscriptionService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  //To convert searched to title case for showing as title in searcged news
  toTitleCase (str) {
    if ((str===null) || (str===''))
         return false;
    else
     str = str.toString();
  
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  
  //to call load news everytime a change is made to the keyword i.e. something is searched
  
  loadData(){
    this.subscription.searchQ.subscribe(search => {
      this.apicall = true;
      this.newsall.clear();
      this.pagecount = 1; 
      this.keyword = search;
      // console.log(search);
      this.loadnews(search);
    });
  }

  //To load the news using api call
  loadnews(search){
    this.apicall = true;
    this.news = [];
      this.apiCalls.getNewsApiSearch(search, '2020-06-21',null,this.pagecount).then((response: HttpResponse<any>) => {
        this.title = search == 'a'? "Home" : this.toTitleCase(search);
        this.apicall = false;
        if (response.status == 200) {
          // console.log(response.body);
          response.body.articles.forEach(article => {
            article.publishedAt = moment(article.publishedAt).fromNow();
            this.news.push(article);
          });
          this.newsall.set(this.pagecount,this.news);
          this.pagelength = Math.ceil(response.body.totalResults/this.rowcount);
          this.apicall = false;
          // console.log(this.news);
        } else {
          console.log(response);
        }
      }).catch((e: any) => {
        console.log(e);
      });
  }

  //To traverse amongst the pages using pagination
  movetopage(len){
    this.pagecount=len;
    this.checkData();
  }

  //Check if the searched data exits or not
  checkData(){
    if(this.newsall.has(this.pagecount)){
      this.news = this.newsall.get(this.pagecount);
      this.apicall = false;
    }
    else{
      this.loadnews(this.keyword);
    }
    var node = document.getElementById("searched");
    window.scrollTo(0,node.offsetTop);
  }
}
