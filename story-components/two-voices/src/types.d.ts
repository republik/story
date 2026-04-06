export type Speaker = "Ronja" | "Daniel";

export type Page = {
  speaker: Speaker;
  text: string; // HTML text containing links and paragraphs
};

export type Chapter = {
  title: string;
  time: number; // time of the day in hours (e.g. 6 = 06:00, 7.5 = 07:30)
  coverUrl?: string;
  pages: Page[];
};

export type InputData = {
  chapters: Chapter[];
};

