import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  public searchQ: BehaviorSubject<any> = new BehaviorSubject(null);
  public category: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  public setQ(role: any){
    this.searchQ.next(role);
  }

  public setCategory(role: any){
    this.category.next(role);
  }
}
