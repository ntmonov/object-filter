import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export interface Filter {
  order: number;
  propToFilter: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() public inputData: any[];
  @Input() public filters: Filter[];

  public filteredData: {
    [key: string]: any[]
   } = {};

  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({});

    this.filters.forEach(filter => {
      this.filteredData[`${filter.propToFilter}`] = this.inputData.slice();
      this.formGroup.addControl(filter.propToFilter, new FormControl(''));
    });
  }

  public filterData(value: string, prop: string): void {
    const regex: RegExp = new RegExp(value, 'i');
    let filterOrder: number = this.filters.find(filter => filter.propToFilter === prop).order;

    let data: any[];

    if (filterOrder === 0) {
      data = this.inputData.filter(obj => {
        return regex.test(obj[`${prop}`]);
      });
    } else {
      do {
        const prevProp: string = this.filters.find(filter => (filter.order === filterOrder - 1)).propToFilter;

        data = this.filteredData[`${prevProp}`].filter(obj => {
          return regex.test(obj[`${prop}`]);
        });

        filterOrder--;
      } while (filterOrder > 0);

    }

    this.filteredData[`${prop}`] = data;
  }

  public sendForm(): void {
    console.log(this.formGroup.value);
  }

  public prevSelected(order: number): boolean {
    if (order === 0) {
      return true;
    }

    const prevProp: string = this.filters.find(filter => filter.order === (order - 1)).propToFilter;


    const prevFiltered: boolean = this.filteredData[`${prevProp}`].every((obj, index, arr) => {
      return obj[`${prevProp}`] === arr[0][`${prevProp}`];
    });

    return prevFiltered;
  }
}
