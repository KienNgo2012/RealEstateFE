import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {

  constructor() { }

  currentTab: string = 'tab-default';

  changeTab(tab: string): void {
    this.currentTab = tab;
  }
}
