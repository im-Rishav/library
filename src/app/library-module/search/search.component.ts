import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300),takeUntil(this.destroy$)).subscribe(term => this.search.emit(term));
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
