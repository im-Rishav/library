import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Applet {
  name: string;
  categories: string[];
}

export interface Library {
  categories: string[];
  applets: Applet[];
}

export interface CategoryWithCount {
  category: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
private lib: Library = {
    categories: ['Performance', 'Investments', 'Operations'],
    applets: [
      { name: 'Performance Snapshot', categories: ['Performance'] },
      { name: 'Commitment Widget', categories: ['Investments'] },
      { name: 'CMS', categories: ['Investments', 'Performance'] }
    ]
  };

  private librarySubject = new BehaviorSubject<Library>(this.lib);
  library$ = this.librarySubject.asObservable();

  getLibrary(): Library {
    return this.lib;
  }

  addBigData(ncategs: number, napplets: number): void {
    for (let i = 0; i < ncategs; i++) {
      this.lib.categories.push(`Sample Category ${i}`);
    }
    const n = this.lib.categories.length;
    for (let i = 0; i < napplets; i++) {
      const a: Applet = { name: `CMS${i}`, categories: [] };
      for (let j = 0; j < Math.floor(Math.random() * 10); ++j) {
        const idx = Math.floor(Math.random() * n) % n;
        a.categories.push(this.lib.categories[idx]);
      }
      this.lib.applets.push(a);
    }
    debugger;
    this.librarySubject.next(this.lib);
  }
}
