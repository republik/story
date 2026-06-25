import * as React from 'react';
import { css } from 'glamor';
import { Reason } from '../types';
import Card from './Card';
import gql from 'graphql-tag';

type DeckProps = {
  reasons: Reason[];
};

const query = gql`
  {
    query
    questionnaire(slug: "101-reasons") {
      id
      slug
      description
      beginDate
      endDate
      userIsEligible
      userHasSubmitted
      turnout {
        eligible
        submitted
      }
      questions {
        ... on QuestionTypeChoice {
          id
          order
          text
          metadata
          userAnswer {
            id
            payload
            submitted
          }
          turnout {
            skipped
            submitted
          }
          options {
            label
            value
            category
          }
          result {
            count
            option {
              label
              value
              category
            }
          }
        }
      }
    }
  }
`;

const Deck: React.FC<DeckProps> = ({ reasons }) => {
  return (
    <div>
      {reasons.map((reason, i) => (
        <Card key={i} reason={reason} totalReasons={reasons.length} />
      ))}
    </div>
  );
};

export default Deck;
