import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
    @Input() corrects: number;
    @Input() length: number;
    @Output() restarQuiz = new EventEmitter<boolean>();
    constructor() {
        this.corrects = 0;
        this.length = 0;
    }

    ngOnInit(): void {}

    tryAgain() {
        this.restarQuiz.emit(true);
    }
}
