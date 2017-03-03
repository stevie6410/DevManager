import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'simple-editor',
  template: '',
  // template: `
  //       <p-editor name="GroupOrderByDesc" [(ngModel)]="data">
	// 					<header>
	// 						<span class="ql-formats">
  //  					        	<button class="ql-bold"></button>
  //           					<button class="ql-italic"></button>
  //           					<button class="ql-underline"></button>
  //      	 					</span>
	// 						<select class="ql-size">
	// 							<option value="small"></option>
	// 							<option selected></option>
	// 							<option value="large"></option>
	// 							<option value="huge"></option>
  // 							</select>
	// 					</header>
	// 				</p-editor>
  // `,
  styleUrls: ['simple-editor.component.css']
})
export class SimpleEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() elementId: string;
  @Input() data: string;
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
  }
}
