import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketAlertsService {

  private alertSubject = new Subject<any>();
  public data$ = this.alertSubject.asObservable();
  constructor() { }

  updateData(newData: any) {
    this.alertSubject.next(newData);
  }
}