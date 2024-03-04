import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedComponentService {
  selectedComponent: string = 'dashboard';

  constructor() { }
}