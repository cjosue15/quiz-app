import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    @Output() sendNextQuote = new EventEmitter<number>();
    @Input() step: number;
    @Input() lengthQuiz: number;
    @Output() showResults = new EventEmitter<boolean>();
    buttonVisible: boolean;
    constructor() {
        this.step = 0;
        this.lengthQuiz = 0;
        this.buttonVisible = false;
    }

    ngOnInit(): void {}

    nextQuote(): void {
        console.log(this.step);
        if (this.step < this.lengthQuiz - 1) {
            this.step++;
            this.buttonVisible = false;
            this.sendNextQuote.emit(this.step);
        } else {
            this.showResults.emit(true);
        }
    }

    changeVisibilityButton() {
        this.buttonVisible = !this.buttonVisible;
    }
}
