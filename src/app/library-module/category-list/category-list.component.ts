import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Applet, CategoryWithCount } from '../library.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnChanges {

  selectedCategory: string | null = null;

  @Input() categories: CategoryWithCount[] = [];
  @Input() applets: Applet[] = [];
  @Output() selectCategory = new EventEmitter<string>();

  firstChangeHandled = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.firstChangeHandled && changes['categories']) {
      this.onCategorySelect(this.categories[0].category);
      this.firstChangeHandled = true;
    }
  }

  onCategorySelect(category: string) {
    this.selectedCategory = category;
    this.selectCategory.emit(category);
  }


  countApplets(cat: string): number {
    return this.applets.filter(app => app.categories.includes(cat)).length;
  }

  trackByCategory(index: number, item: CategoryWithCount): string {
  return item.category; 
}

}