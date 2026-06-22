import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import krimi from "../quizzes/kriminalitaet.json";
import literatur from "../quizzes/literatur.json";
import wef from "../quizzes/wef.json";
import Quiz from "./Quiz";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <div>
      <Quiz config={{ questions: wef }} />
      <br />
      <Quiz config={{ questions: krimi }} />
      <br />
      <Quiz config={{ questions: literatur }} />
      <br />
    </div>
  </StrictMode>,
);
