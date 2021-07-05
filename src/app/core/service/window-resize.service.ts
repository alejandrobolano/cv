import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class WindowResizeService {

  constructor() {
  }

  @HostListener('window:resize')
  protected onWindowResize(): number {
    return document.querySelector('body').offsetWidth;
  }

  get IsMobile(): boolean {
    return this.onWindowResize() && this.onWindowResize() < 768;
  }
  get IsCustomDevice(): boolean {
    return this.onWindowResize() && this.onWindowResize() < 1280;
  }

  get Width(): any {
    return document.querySelector('body').offsetWidth;
  }

  get Height(): any {
    return document.querySelector('body').offsetHeight;
  }
}
