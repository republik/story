export type Speaker = "Ronja" | "Daniel";

export type Page = {
  speaker: Speaker;
  text: string; // HTML text containing links and paragraphs
};

export type Voice = {
  key: string;
  name: string;
  backgroundColor?: string;
  primary?: boolean;
};

export type TitleProps = {
  title: string;
  time: string; // e.g "9 Uhr"
  coverUrl?: string;
};

export type Chapter = TitleProps & {
  pages: Page[];
};

export type InputData = {
  voices: Voice[]; // a map of speaker name to their properties
  chapters: Chapter[];
};
