import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company, DataService } from './services/data.service';
import { FilterService } from './services/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Company[] = this.dataService.fethchData();
  filterSub = new Subscription();
  filterVisibility = 'hidden';

  constructor(
    private dataService: DataService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterSub = this.filterService.activeTags.subscribe((filterList) => {
      this.data = this.dataService.fethchData();

      // filterbox visibility
      if (filterList.size !== 0) {
        this.filterVisibility = 'visible';
      } else {
        this.filterVisibility = 'hidden';
      }
    });
  }

  ngOnDestroy() {
    this.filterSub.unsubscribe();
  }
}
