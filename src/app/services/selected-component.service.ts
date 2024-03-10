import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedComponentService {
  private selectedComponentSource = new BehaviorSubject<string>('dashboard');
  selectedComponent$ = this.selectedComponentSource.asObservable();

  constructor() { }

  showComponent(componentName: string) {
    this.selectedComponentSource.next(componentName);
  }

  getActiveComponent(): string {
    return this.selectedComponentSource.value;
  }
}