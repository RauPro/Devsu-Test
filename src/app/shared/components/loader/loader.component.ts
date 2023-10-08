import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoaderService} from "../../../core/services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading$: Observable<boolean>;
  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) {
    this.isLoading$ = this.loaderService.isLoading.asObservable();
    this.loaderService.isLoading.subscribe(() => {
      this.cdRef.markForCheck();
    });
  }
}
