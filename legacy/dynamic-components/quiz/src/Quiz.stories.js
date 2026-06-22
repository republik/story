import React from "react";
import { storiesOf } from "@storybook/react";

import Quiz from "./index";
import wef from "../quizzes/wef.json";
import krimi from "../quizzes/kriminalitaet.json";
import literatur from "../quizzes/literatur.json";

const WEF_CONFIG = {
  questions: wef,
  results: [
    {
      score: 0,
      message:
        "Ihre WEF-Kompetenz ist schwach. Aber machen Sie sich keine Sorgen – mit Fun Facts über Schwab und Bono gewinnen Sie eh keinen Blumentopf. Good Bye – und bis zum nächsten Jahr! Vergessen Sie nicht, beim Herausgehen den Goodie-Bag von Goldman Sachs mitzunehmen.",
    },
    {
      score: 9,
      message:
        "Ihr Halbwissen ist enttäuschend. Das beeindruckt weder Klaus Schwab noch die Anti-WEF-Aktivisten, die drei Tage lang im Schnee gewandert sind. Wenn Sie Glück haben, lässt man Sie beim Apéro des Open Forum Davos rein. Da gibt’s Salzstängeli und Rivella.",
    },
    {
      score: 16,
      message:
        "Wir sind beeindruckt, Sie sind ein richtiger Davos-Nerd! Wie Sie sicher wissen, wird Klaus Schwab bald 82-jährig. Lange macht er das Theater also nicht mehr mit. Und seine Kinder zeigen wenig Euphorie für seine Nachfolge. Bewerben Sie sich jetzt!",
    },
  ],
};

storiesOf("Quiz", module)
  .add("WEF", () => <Quiz config={WEF_CONFIG} />)
  .add("Kriminalität", () => <Quiz config={{ questions: krimi }} />)
  .add("Literatur", () => <Quiz config={{ questions: literatur }} />);
