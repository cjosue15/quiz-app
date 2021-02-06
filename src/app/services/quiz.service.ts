import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Question, Answer } from '../models/Question';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    constructor(private http: HttpClient) {}

    getQuizQuestion({ category, difficulty }: Data) {
        return this.http.get(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`).pipe(
            map((response: any) => {
                const questions = response.results.map((question: any) => {
                    const incorrectAnswers = question.incorrect_answers.map((item: any): Answer => ({ answersText: item, answersIsCorrect: false }));

                    const obj: Question = {
                        category: question.category,
                        difficulty: question.difficulty,
                        question: question.question,
                        answers: [...incorrectAnswers, { answersText: question.correct_answer, answersIsCorrect: true }].sort(
                            () => 0.5 - Math.random()
                        ),
                    };
                    return obj;
                });
                return questions;
            })
        );
    }

    getCategories() {
        return this.http.get('https://opentdb.com/api_category.php');
    }
}

interface Data {
    category: string;
    difficulty: string;
}
