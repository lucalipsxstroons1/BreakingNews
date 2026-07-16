import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonToggleModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  @Output()
  filterChanged = new EventEmitter<string>();

  @Output()
  searchChanged = new EventEmitter<string>();

  categories = ['All', 'Tech', 'Business', 'Sports'];

  searchText = '';

  changeCategory(category: string): void {
    this.filterChanged.emit(category);
  }

  searchCategory(): void {
    this.searchChanged.emit(this.searchText);
  }
}
