import React from 'react'
import ShareButtons from './share/ShareButtons'
import {
  CommentBodyBlockQuote,
  CommentBodyBlockQuoteParagraph,
  useColorContext,
} from '@project-r/styleguide'

// const ASSETS_BASE_URL = 'https://cdn.repub.ch/s3/republik-assets/dynamic-components/101-reasons/asserts'

const Share = ({ body, subject, url, videoUrl, icons }) => {
  const [colorScheme] = useColorContext()
  return (
    <div {...colorScheme.set('color', 'text')}>
      <CommentBodyBlockQuote>
        {body &&
          body.split('\n\n').map((p, i) => (
            <CommentBodyBlockQuoteParagraph key={i}>
              <span
                dangerouslySetInnerHTML={{
                  __html: p.replace('\n', '<br />'),
                }}
              />
            </CommentBodyBlockQuoteParagraph>
          ))}
        <ShareButtons
          body={body}
          subject={subject}
          url={url}
          videoUrl={videoUrl}
          icons={icons}
          style={{ marginTop: 15 }}
        />
      </CommentBodyBlockQuote>
    </div>
  )
}

export default Share
