import { Component } from '@angular/core';
import { Applet } from '../Common/Models/interfaces';
import { LibraryService } from '../Common/Services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  categories: string[] = [];
  applets: Applet[] = [];
  selectedCategory = '';
  searchTerm = '';

  constructor(private libraryService: LibraryService) {
    const lib = this.libraryService.getLibrary();
    this.categories = lib.categories;
    this.applets = lib.applets;
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

  addMoreData(){
    this.libraryService.addBigData(100,1000);
  }
}