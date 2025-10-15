export type CategoryName = "activism" | "journalism" | "science";

export type Category = {
  name: CategoryName;
  color: string;
  background: string;
};

export type Respondent = {
  name: string;
  description: string;
  avatarUrl: string;
};

export type Answer = {
  respondent: Respondent;
  text: string;
};

export type AnswersByCategory = {
  category: Category;
  answers: Answer[];
};

export type InputData = {
  question: string;
  answers: AnswersByCategory[];
};
