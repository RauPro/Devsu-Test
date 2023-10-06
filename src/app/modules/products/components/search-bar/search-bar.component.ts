import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() SearchTerm = new EventEmitter<string>();

  search(term: Event) {
    const target = term.target as HTMLInputElement;
    const termValue = target.value;
    this.SearchTerm.emit(termValue);
  }
}
