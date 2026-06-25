import React, { useMemo } from 'react'
import { css } from 'glamor'
import { Editorial, colors, slug, InfoBox, InfoBoxText, InfoBoxTitle, InfoBoxListItem } from '@project-r/styleguide'
import scrollIntoView from 'scroll-into-view'

import Anchor from './Anchor'

import { createOnSlugClick } from './utils'

const updatedStyle = {
  borderLeft: `3px solid ${colors.primary}`,
  paddingLeft: 7,
  marginLeft: -10
}

const Subhead = ({ slug, children, updated }) => {
  return <Editorial.Subhead style={updated && updated.length !== 0 ? updatedStyle : undefined}>
    <Anchor id={slug} />
    {children}
    {updated && updated.length && <style dangerouslySetInnerHTML={{ __html: updated.map(selector => `${selector}{border-left: 3px solid ${colors.primary};padding-left: 7px;margin-left: -10px;}`).join('\n') }} />}
  </Editorial.Subhead>
}

const Toc = ({ toc, title, updatedAt, slug }) => {
  return <InfoBox>
    <InfoBoxTitle>
      <Anchor id={slug} />
      {title}
    </InfoBoxTitle>
    <Editorial.UL compact>
      {toc.map((item, i) => {
        const { href } = item
        return <InfoBoxListItem key={i}>
          <InfoBoxText attributes={{style: item.updated ? {
            ...updatedStyle,
            paddingLeft: 29,
            marginLeft: -32
          } : {}}}>
            <Editorial.A href={href} onClick={createOnSlugClick(href)}>
              {item.title}
            </Editorial.A>
          </InfoBoxText>
        </InfoBoxListItem>
      })}
    </Editorial.UL>
    {updatedAt && <InfoBoxText attributes={{ style: updatedStyle }}>
      {updatedAt}
    </InfoBoxText>}
  </InfoBox>
}

const Index = ({ subhead, toc, ...rest }) => {
  if (subhead) {
    return <Subhead {...rest} slug={rest.slug || slug(subhead)}>
      {subhead}
    </Subhead>
  }

  if (toc) {
    return <Toc toc={toc} {...rest} slug={rest.slug || slug(rest.title)} />
  }

  return null
}

export default Index

