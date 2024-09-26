import { COLOURS } from '@consts/consts'
import { DiceNames } from '@datatypes/dice'

export const getDiceColour = (dice: string, swatchInd: number) => {
  const swatch = COLOURS[swatchInd]
  switch (dice) {
    case 'd20':
      return '#' + swatch[0]
    case 'd12':
      return '#' + swatch[1]
    case 'd10':
      return '#' + swatch[2]
    case 'd8':
      return '#' + swatch[3]
    case 'd6':
      return '#' + swatch[4]
    case 'd4':
      return '#' + swatch[5]
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
