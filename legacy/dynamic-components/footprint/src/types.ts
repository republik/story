export type Size = {
  width: number
  height: number
  top: number
  padding: number
  mobile: boolean
  headerHeight: number
}

export type Action = {
  id: number;
  description: string;
  option: string;
  delta: number;
  selected?: number;
  category: string;
  month?: number;
  message?: string
  dep1?: any;
  dep2?: any;
}

export type Budget = {
  Ernährung: number
  Mobilität: number
  Wohnen: number
  Konsum: number
  'Öffentliche Dienstleistungen': number
}

export type Profile = {
  id: string
  name: string
  target: string
  description?: string
  actions?: Action[]
  budget?: Budget,
  outro?: string,
  analysis?: string
}

export type Option = {
  id: number
  option: string
  delta: number
  selected: number
  selectable?: boolean
  message?: string
  dep1?: any;
  dep2?: any;
}

export type CardType = {
  id: number
  description?: string
  category?: string
  month?: number
  selectedOption?: Option
  options: Option[]
}

export type GameState = CardType[]