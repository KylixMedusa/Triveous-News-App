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


  toTitleCase (str) {
    if ((str===null) || (str===''))
         return false;
    else
     str = str.toString();
  
   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  
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
  previousPage(){
    --this.pagecount;
    this.checkData(); 
  }

  //Takes user to next page
  nextPage(){
    ++this.pagecount;
    this.checkData();
  }

  //Takes user to first page
  firstPage(){
    this.pagecount=1;
    this.checkData();
  }

  //Takes user to last page 
  lastPage(){
    this.pagecount=this.pagelength;
    this.checkData();
  }
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
