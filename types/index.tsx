export type Info = {
  points: number;
  isCorrect: boolean;
  msg: string;
  earnedPoints: number;
};

export type Data = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
