import { Component } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { NgClass } from '@angular/common';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  todos:Todo[] =[]
  displayedColumns: string[] = ['select', 'title', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Todo>(this.todos);
  selection = new SelectionModel<Todo>(true, []);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getTodo()
      .subscribe((data) => {
        this.todos=data;
        this.dataSource.data = this.todos;
        console.log(this.todos);
      })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Todo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

 

 

}

