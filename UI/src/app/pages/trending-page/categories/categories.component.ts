import {
  Component,
  Input,
  Output,
  EventEmitter,
  output,
  input,
} from '@angular/core';
import { Category } from '../../../types/category.enum';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
})
export class CategoriesComponent {
  categories = input.required<
    {
      name: string;
      icon: string;
      value: Category;
    }[]
  >();
  categoryChosen = output<number>();

  onCategoryChosen(index: number) {
    this.categoryChosen.emit(index);
  }
}
