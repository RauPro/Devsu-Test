import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);
  show() {
    setTimeout(() => this.isLoading.next(true));
  }
  hide() {
    setTimeout(() => this.isLoading.next(false));
  }
}
