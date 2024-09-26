export interface IDice {
  name: DiceNames
  num: number
  rolls: number[]
}

export type DiceNames = 'd20' | 'd12' | 'd10' | 'd8' | 'd6' | 'd4'

export interface IDiceRolled {
  dice: number
  rolledNum: number
}

export interface IRoll {
  rollName: string
  colour: string
  dices?: IRollDices
  modifier?: number
}

interface IRollDices {
  d20?: number
  d12?: number
  d10?: number
  d8?: number
  d6?: number
  d4?: number
}

export interface IHistoryRoll {
  id: string
  rollName?: string
  colour?: string
  dices: IDice[]
  modifier: number
  rollsTotal: number
}
