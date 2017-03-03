import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public visible = false;
  private visibleAnimate = false;

  @Input() name: string;

  constructor() { }

  ngOnInit() { }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 300);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }
}