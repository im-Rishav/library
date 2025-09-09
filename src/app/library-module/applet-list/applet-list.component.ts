import { Component, Input } from '@angular/core';
import { Applet } from '../Common/Models/interfaces';

@Component({
  selector: 'app-applet-list',
  templateUrl: './applet-list.component.html',
  styleUrls: ['./applet-list.component.css']
})
export class AppletListComponent {
@Input() applets: Applet[] = [];

  trackByFn(index: number, app: Applet) {
    return app.name;
  }
}
