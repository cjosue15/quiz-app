import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { Question } from './models/Question';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { FormControl, Validators } from '@angular/forms';
import { style, state, animate, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // animations: [
    //     trigger('fadeInOut', [
    //         transition(':enter', [
    //             // :enter is alias to 'void => *'
    //             style({ opacity: 0 }),
    //             animate(500, style({ opacity: 1 })),
    //         ]),
    //         transition(':leave', [
    //             // :leave is alias to '* => void'
    //             animate(500, style({ opacity: 0 })),
    //         ]),
    //     ]),
    // ],
    // animations: [
    //     trigger('enterAnimation', [
    //         transition(':enter', [
    //             style({ transform: 'translateX(100%)', opacity: 0 }),
    //             animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
    //         ]),
    //         transition(':leave', [
    //             style({ transform: 'translateX(0)', opacity: 1 }),
    //             animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
    //         ]),
    //     ]),
    // ],
    animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(600, style({ opacity: 1 }))])])],
})
export class AppComponent implements OnInit {
    answers: Question[];
    step: number;
    lengthQuiz: number;
    isStartedQuiz: boolean;
    showResults: boolean;
    isConfigurationFinished: boolean;
    category: FormControl;
    difficulty: FormControl;
    time: FormControl;
    categories: { id: number; name: string }[];
    corrects: number;
    @ViewChild('header', { static: false }) header: HeaderComponent;
    @ViewChild('body', { static: false }) body: BodyComponent;
    @ViewChild('footer', { static: false }) footer: FooterComponent;
    constructor(private quizService: QuizService) {
        this.answers = [];
        this.step = 0;
        this.lengthQuiz = 0;
        this.header = {} as any;
        this.body = {} as any;
        this.footer = {} as any;
        this.isStartedQuiz = true;
        this.showResults = false;
        this.isConfigurationFinished = false;
        this.categories = [];
        this.corrects = 0;
        this.category = new FormControl('', Validators.required);
        this.time = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]);
        this.difficulty = new FormControl('', Validators.required);
    }

    ngOnInit(): void {
        this.quizService.getCategories().subscribe(
            (response: any) => (this.categories = response.trivia_categories),
            (error) => console.log(error)
        );
    }

    showRules() {
        this.time.setValue(Number(this.time.value));
        this.isConfigurationFinished = true;
        this.quizService.getQuizQuestion({ category: this.category.value, difficulty: this.difficulty.value }).subscribe(
            (response) => {
                this.answers = response;
                this.lengthQuiz = response.length;
            },
            (error) => console.log(error)
        );
    }

    exitQuiz() {
        this.formReset();
        this.isConfigurationFinished = false;
    }

    formReset() {
        this.time.reset();
        this.category.reset();
        this.difficulty.reset();
        this.category.setValue('');
        this.difficulty.setValue('');
    }

    startQuiz() {
        this.isStartedQuiz = false;
    }

    next(event: number): void {
        this.step = event;
    }

    changeResult(event: boolean) {
        this.showResults = event;
        this.corrects = this.body.getCorrectAnswers;
    }

    getStopTimers() {
        this.header.stopTimers();
        this.body.disabledOptionsAndCheckCorrect();
        this.footer.changeVisibilityButton();
    }

    restarQuiz(event: boolean) {
        this.formReset();
        this.isStartedQuiz = true;
        this.showResults = false;
        this.isConfigurationFinished = false;
        this.answers = [];
        this.step = 0;
        this.lengthQuiz = 0;
        this.corrects = 0;
    }

    validateButton(): boolean {
        return this.category.invalid || this.difficulty.invalid || this.time.invalid;
    }
}
