import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  //Inputs
  @Input()
  data!: [];

  @Input()
  columns!: [];

  @Input()
  perPage: number = 10;

  @Input()
  detailsRoute: string = "";

  //Data table options
  @Input()
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router) { }

  async ngOnInit() {
    this.dtOptions = {
      data: this.data,
      columns: this.columns,
      pagingType: 'simple_numbers',
      pageLength: this.perPage,
      lengthMenu: [5, 10, 20, 50, 100],
      order: [0, "asc"],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        row.addEventListener("click", e => {
          this.router.navigate([this.detailsRoute, "details", data["id"]])
        })
        return row;
      }
    };
    console.log(this.data.length ? this.data : this.data.length)
  }

}
