import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Question, Answer } from '../../models/Question';

@Component({
    selector: 'app-body',
    templateUrl: './body.component.html',
    styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
    @Input() answers: Question[];
    @Input() activatedStep: number;
    @Output() stopTimers = new EventEmitter();
    @ViewChild('optionsContent') optionsContent: ElementRef;
    checkIcon: string;
    crossIcon: string;
    options: any;
    correctAnswer: number;
    constructor() {
        this.answers = [];
        this.activatedStep = 0;
        this.options = [];
        this.optionsContent = {} as any;
        this.checkIcon = '<i class="fa fa-check correct-icon" aria-hidden="true"></i>';
        this.crossIcon = '<i class="fa fa-times error-icon" aria-hidden="true"></i>';
        this.correctAnswer = 0;
    }

    ngOnInit(): void {}

    get getCorrectAnswers(): number {
        return this.correctAnswer;
    }

    selectQuestion(item: Answer, el: HTMLLIElement, answer: Question, optionsContent: HTMLUListElement) {
        const index = answer.answers.findIndex((item) => item.answersIsCorrect);
        this.options = optionsContent.children;

        if (item.answersIsCorrect) {
            el.classList.add('correct');
            el.insertAdjacentHTML('beforeend', this.checkIcon);
            this.correctAnswer++;
        } else {
            el.classList.add('error');
            this.options[index].classList.add('correct');
        }

        this.disabledOptions();

        this.stopTimers.emit();
    }

    disabledOptions() {
        Array.from(this.options).forEach((element: any) => {
            element.classList.add('disabled');
        });
    }

    disabledOptionsAndCheckCorrect() {
        const index = this.answers[this.activatedStep].answers.findIndex((item) => item.answersIsCorrect);
        this.options = this.optionsContent.nativeElement.children;
        this.options[index].classList.add('correct');
        Array.from(this.options).forEach((element: any) => {
            element.classList.add('disabled');
        });
    }
}
