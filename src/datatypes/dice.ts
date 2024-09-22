export interface IDice {
  name: DiceNames
  num: number
  rolls: number[]
  colour: string
}

export type DiceNames = 'd20' | 'd12' | 'd10' | 'd8' | 'd6' | 'd4'

export interface IDiceRolled {
  dice: number
  rolledNum: number
}
