export type CategoryName = "Wissenschaft" | "Aktivismus" | "Kultur";

export type Category = {
  name: CategoryName;
};

export type Respondent = {
  name: string;
  descriptionShort?: string;
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
