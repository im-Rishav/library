import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AppletListComponent } from './applet-list/applet-list.component';
import { SearchComponent } from './search/search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    LibraryComponent,
    CategoryListComponent,
    AppletListComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [
    LibraryComponent   
  ]
})
export class LibraryModuleModule { }
