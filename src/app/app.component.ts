import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { Question } from './models/Question';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/body.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
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
        this.category = new FormControl('', Validators.required);
        this.time = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]);
        this.difficulty = new FormControl('', Validators.required);
    }

    ngOnInit(): void {
        this.quizService.getQuizQuestion().subscribe(
            (response) => {
                this.answers = response;
                this.lengthQuiz = response.length;
            },
            (error) => console.log(error)
        );
        this.quizService.getCategories().subscribe(
            (response: any) => (this.categories = response.trivia_categories),
            (error) => console.log(error)
        );
    }

    showRules() {
        this.time.setValue(Number(this.time.value));
        this.isConfigurationFinished = true;
    }

    exitQuiz() {
        this.time.reset();
        this.category.reset();
        this.difficulty.reset();
        this.category.setValue('');
        this.difficulty.setValue('');
        this.isConfigurationFinished = false;
    }

    startQuiz() {
        this.isStartedQuiz = false;
    }

    next(event: number): void {
        this.step = event;
    }

    changeResult(event: boolean) {
        this.showResults = event;
    }

    getStopTimers() {
        this.header.stopTimers();
        this.body.disabledOptionsAndCheckCorrect();
        this.footer.changeVisibilityButton();
    }

    validateButton(): boolean {
        return this.category.invalid || this.difficulty.invalid || this.time.invalid;
    }
}
