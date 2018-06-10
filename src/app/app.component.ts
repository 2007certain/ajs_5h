import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { DataService } from './services/dataService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  show:Boolean = false;
  constructor(
    private dataService: DataService,
    private cdRef : ChangeDetectorRef
  ) {

  }
  ngAfterViewChecked() {
    let show = this.dataService.loading;
    if (show != this.show) {
      this.show = show;
      this.cdRef.detectChanges();
    }
  }
}
