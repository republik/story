import omit from 'lodash/omit'
import pick from 'lodash/pick'
import sortBy from 'lodash/sortBy'
import { Action, CardType, GameState, Option } from './types'

export function actions2Cards(actions: Action[]): CardType[] {
  return sortBy(
    actions.reduce((acc, cur, i) => {
      const optionAttrs = [
        'id',
        'option',
        'delta',
        'selected',
        'message',
        'dep1',
        'dep2'
      ]
      const nextOption = pick(cur, optionAttrs)

      if (cur.description) {
        return [
          ...acc,
          {
            ...omit(cur, optionAttrs),
            options: [nextOption]
          }
        ]
      } else {
        acc[acc.length - 1].options.push(nextOption)
        return acc
      }
    }, []),
    [o => o.month]
  ).map((c, id) => ({
    ...c,
    id
  }))
}

export function selectOptions(
  gameState: GameState,
  cardId: number,
  optionIds: number[]
): GameState {
  const nextState = gameState.map(card => {
    let nextOptions = card.options
    if (cardId === card.id && optionIds.length > 0) {
      nextOptions = card.options.map(c => ({
        ...c,
        selected: optionIds.includes(c.id) ? 1 : 0
      }))
    }
    return {
      ...card,
      options: nextOptions
    }
  })
  return nextState
}

export function findActiveOptions(
  gameState: GameState,
  cardId: number,
  selectAll = false
): Option[] {
  const card = gameState.find(c => c.id === cardId)
  const checkState = gameState.filter(c => c.id !== cardId)
  const selected = selectAll
    ? card.options
    : card.options.filter(c => c.selected > 0)

  const active = selected.filter(
    (o, i) =>
      (!o.dep1 ||
        checkState.some(c =>
          c.options.some(
            p =>
              p.id == o.dep1 &&
              findActiveOptions(checkState, c.id)[0]?.id === p.id
          )
        )) &&
      (!o.dep2 ||
        checkState.some(c =>
          c.options.some(
            p =>
              p.id == o.dep2 &&
              findActiveOptions(checkState, c.id)[0]?.id === p.id
          )
        ))
  )

  if (active.length > 0) {
    return active
  } else {
    const revertedOptions = card.options.filter(c => c.delta === 0).map(c => ({ ...c, selected: 1}))    
    return revertedOptions
  }
}
