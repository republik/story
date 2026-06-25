import * as React from 'react';
import { css } from 'glamor';

import { useHeaderHeight } from '@project-r/styleguide';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

type Props = {};

const App: React.FC<Props> = () => {
  const [, rules] = useHeaderHeight();

  const wrapperStyle = css(
    rules.reduce(
      (acc, { mediaQuery, headerHeight }) =>
        Object.assign(acc, { [mediaQuery]: { marginTop: headerHeight } }),
      {}
    )
  );

  const query = gql`
    {
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

  return (
    <div {...wrapperStyle}>
      <Query query={query}>
        {({ loading, error, data }) => {
          console.log("data", data)
          return <h1>Start</h1>;
        }}
      </Query>
    </div>
  );
};

export default App;
