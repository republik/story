import React from "react";

import { Editorial, RawHtml } from "@project-r/styleguide";

import Choice from "./Choice";
import Estimate from "./Estimate";
import { css } from "glamor";

const styles = {
  section: css({
    marginTop: 60,
  }),
};

const Quiz = ({ config: { questions = [], results = [] } = {} }) => {
  const [gameState, setGameState] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const addChoice = (choice) =>
    setGameState((state) => {
      const index = state.findIndex((s) => s.id === choice.id);
      if (index >= 0) {
        state[index] = choice;
        setCounter(counter + 1);
        return state;
      }
      return [...state, choice];
    });

  const resultsByScoreDesc = React.useMemo(() => {
    return [...results].sort((a, b) => b.score - a.score);
  }, [results]);

  const numQuestions = questions.reduce(
    (acc, cur) => acc + cur.questions.length,
    0,
  );
  const score = gameState.filter((s) => s.result === true).length;

  const { message } = resultsByScoreDesc.find((r) => score >= r.score) || {};

  const answersNeeded = Math.min(5, numQuestions);

  return (
    <div>
      {questions.map((d) => (
        <section {...styles.section}>
          {d.group && <Editorial.Subhead>{d.group}</Editorial.Subhead>}
          {d.groupDescription && (
            <Editorial.P>{d.groupDescription}</Editorial.P>
          )}
          {d.questions.map((q) =>
            q.type == "choice" ? (
              <Choice
                onChange={addChoice}
                choice={gameState.find((c) => c.id === q.id)}
                {...q}
              />
            ) : (
              <Estimate
                onChange={addChoice}
                choice={gameState.find((c) => c.id === q.id)}
                {...q}
              />
            ),
          )}
        </section>
      ))}
      {results.length > 0 &&
        (gameState.length < answersNeeded ? (
          <section {...styles.section}>
            <Editorial.P>
              Sie wollen wissen, wie Sie abgeschnitten haben? Bitte beantworten
              Sie mindestens {answersNeeded} Fragen!
            </Editorial.P>
          </section>
        ) : (
          <section {...styles.section}>
            <Editorial.Subhead>Ihr Ergebnis</Editorial.Subhead>
            <Editorial.P>
              {`Sie haben ${gameState.length} von ${numQuestions} Fragen beantwortet, davon ${score} richtig.`}
            </Editorial.P>
            <Editorial.P>
              <RawHtml
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              />
            </Editorial.P>
          </section>
        ))}
    </div>
  );
};

export default Quiz;
