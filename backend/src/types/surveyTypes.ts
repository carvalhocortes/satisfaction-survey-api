export type Survey = {
  id: string;
  target: string;
  questions: string[];
}

export type SurveyAnswer = {
  email: string;
  rate: number;
  answers?: Answer[]
}

type Answer = {
  question: string;
  answer: string;
}
