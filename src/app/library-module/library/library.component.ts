import { Component, OnDestroy, OnInit } from '@angular/core';
import { Applet, Library } from '../Common/Models/interfaces';
import { LibraryService } from '../Common/Services/library.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit, OnDestroy {
  categories: string[] = [];
  applets: Applet[] = [];
  selectedCategory = '';
  searchTerm = '';
  private destroy$ = new Subject<void>();
  constructor(private libraryService: LibraryService) {

  }

  ngOnInit(): void {

    this.libraryService.library$.pipe(takeUntil(this.destroy$)).subscribe((lib:Library)=>{
      this.categories=lib.categories;
      this.applets=lib.applets;
    })
    
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
  }

  onSearch(term: string) {
    this.searchTerm = term.toLowerCase();
  }


  get filteredCategories() {
    const allCategoriesWithCount = this.categories.map(cat => ({
      category: cat,
      count: this.applets.filter(app => app.categories.includes(cat)).length
    }));

    if (!this.searchTerm || this.searchTerm.trim() === '') {
      return allCategoriesWithCount;
    }

    return this.categories
      .map(cat => ({
        category: cat,
        count: this.applets.filter(
          app =>
            app.categories.includes(cat) &&
            app.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).length
      }))
      .filter(catObj => catObj.count > 0);
  }




  get filteredApplets() {
    return this.applets.filter(
      app =>
        app.categories.includes(this.selectedCategory) &&
        app.name.toLowerCase().includes(this.searchTerm)
    );
  }

  addMoreData() {
    this.libraryService.addBigData(100, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}