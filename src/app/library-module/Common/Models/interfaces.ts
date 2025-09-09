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