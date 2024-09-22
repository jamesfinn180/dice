import { DiceNames } from '@datatypes/dice'

export const getDiceColour = (dice: string) => {
  switch (dice) {
    case 'd20':
      return '#845ec2'
    case 'd12':
      return '#d65db1'
    case 'd10':
      return '#ff6f91'
    case 'd8':
      return '#ff9671'
    case 'd6':
      return '#ffc75f'
    case 'd4':
      return '#ade968'
    default:
      return '#000'
  }
}

export const getRandNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const sumArray = (arr: number[]): number =>
  arr.reduce((sum, n) => sum + n, 0)

export const getNumFromDice = (diceName: DiceNames): number => {
  return parseInt(diceName.slice(1))
}
