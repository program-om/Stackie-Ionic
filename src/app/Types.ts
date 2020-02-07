export interface Question {
    question_id: string;
    link: string;
    title: string;
    body: string;
}

export interface Answer {
    link: string;
    body: string;
    answer_id: string;
    score: string;
    is_accepted: boolean;
}

export interface Basket {
    questions?: [ {
            questionId: string;
            answersIds: string[];
        }
    ];
    name: string;
}

export interface UserInfo {
    email: string;
    user_name: string;
    _id: string;
    baskets_num: number;
}

export interface Resp<T> {
    result: T;
}

export interface BasketQuestions {
    questions: Question[];
}
