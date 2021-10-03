import { Component } from '@angular/core';
import * as data from '../assets/services.json';
import { Filter } from './components/filter/filter.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public inputData: any[] = (data as any).default;
  public filters: Filter[] = [
    {
      propToFilter: 'city',
      order: 0
    },
    {
      propToFilter: 'serviceName',
      order: 1
    }
    // {
    //   propToFilter: 'email',
    //   order: 2
    // }
  ];

  constructor() {

  }
}
