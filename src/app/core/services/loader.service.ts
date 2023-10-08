import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);

  show() {
    // Cambiamos el valor fuera del ciclo de detección de cambios actual
    setTimeout(() => this.isLoading.next(true));
  }

  hide() {
    // Cambiamos el valor fuera del ciclo de detección de cambios actual
    setTimeout(() => this.isLoading.next(false));
  }
}
