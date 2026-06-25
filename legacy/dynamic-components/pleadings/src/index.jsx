import React, { useEffect, useMemo } from 'react'
import { compose } from 'react-apollo'
import {
  DiscussionContext,
  createFormatter,
  Loader,
} from '@project-r/styleguide'
import withPleadings from './lib/hocs/withPleadings'
import Composer from './components/Composer'
import PleadingList from './components/PleadingList'
import withSubmitHandler from './lib/hocs/withSubmitHandler'
import withMe from './lib/hocs/withMe'
import { css } from 'glamor'

const styles = {
  wrapper: css({
    '& > div:not(:first-child)': {
      marginTop: '2rem',
    },
  }),
}

const Index = ({
  data,
  handleSubmit,
  tagMapping,
  translations,
  meData: { me },
}) => {
  const { loading, error, discussion, refetch, startPolling, stopPolling } =
    data

  const t = useMemo(
    () =>
      createFormatter([
        {
          key: 'discussion/closed',
          value: 'Es können keine neue Fragen mehr eingegeben werden.',
        },
        {
          key: 'discussion/notEligible',
          value:
            'Wollen Sie teilnehmen? Werden Sie jetzt Verleger und Abonnentin.',
        },
        {
          key: 'discussion/notSignedIn',
          value: 'Sie müssen sich zuerst anmelden.',
        },
        ...(translations || []),
      ]),
    [translations]
  )

  const filteredPleadings = useMemo(
    () =>
      discussion && discussion.comments
        ? discussion.comments.nodes.filter(
            (comment) => !comment.adminUnpublished && !comment.unpublished
          )
        : [],
    [discussion]
  )

  // When the discussion is loaded, start polling every
  useEffect(() => {
    if (discussion && !discussion.closed) {
      startPolling(120000)
    }

    return () => {
      stopPolling()
    }
  }, [discussion])

  if (loading || error) {
    return <Loader loading={loading} error={error} />
  }

  return (
    <DiscussionContext.Provider
      value={{
        discussion: discussion,
        actions: {},
      }}
    >
      <div {...styles.wrapper}>
        {discussion.userCanComment && (
          <Composer
            t={t}
            discussion={discussion}
            refetch={refetch}
            submitHandler={handleSubmit}
          />
        )}
        <PleadingList
          t={t}
          tagMapping={tagMapping}
          pleadings={filteredPleadings}
        />
      </div>
    </DiscussionContext.Provider>
  )
}

export default compose(withMe(), withPleadings(), withSubmitHandler())(Index)
