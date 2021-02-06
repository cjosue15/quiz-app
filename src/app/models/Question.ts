// export interface Question {
//     category: string;
//     correct_answer: string;
//     difficulty: string;
//     incorrect_answers: string[];
//     question: string;
//     isCorrect: boolean;
// }

export interface Question {
    category: string;
    difficulty: string;
    answers: Answer[];
    question: string;
    isCorrect?: boolean;
}

export interface Answer {
    answersText: string;
    answersIsCorrect: boolean;
}
