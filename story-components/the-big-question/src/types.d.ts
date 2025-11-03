export type CategoryName =
  | "Politik & Kooperation"
  | "Innovation & Praxis"
  | "Forschung"
  | "Klimaschutz"
  | "Medien & Kultur";

export type Category = {
  name: CategoryName;
  color: string;
  hover: string;
};

export type Respondent = {
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
};

export type Answer = {
  respondent: Respondent;
  text: string;
  quote: string;
};

export type AnswersByCategory = {
  category: Category;
  answers: Answer[];
};

export type InputData = {
  question: string;
  answers: AnswersByCategory[];
};
