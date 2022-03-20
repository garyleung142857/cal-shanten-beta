import { calShantenRule } from "./CalShanten.js";
import { calUkeire } from "./Ukerie.js";
import { suitMap } from "./SuitCombination.js";
import { tilesQuery, suitStrsQuery } from "./InOut.js";

const hand = [
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
]

const hand2 = [
  [1, 0, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
]

const hand3 = [
  [3, 0, 0, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 3, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0]
]

const hand4 = [
  [0, 0, 0, 0, 3, 2, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 1],
  [3, 0, 0, 3, 1, 0, 1]
]

const hand5 = [
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
]

const hand6 = [
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [2, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
]

const hand7 = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0, 1, 2],
  [0, 0, 0, 0, 0, 0, 0]
]

const hand8 = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 1],
  [0, 0, 1, 1, 1, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0]
]

const hand9 = [
  [0, 2, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 3, 3, 1, 0, 0]
]

const hand10 = [
  [0, 2, 0, 1, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 3, 3, 0, 0, 0]
]

const suitStr1 = [
  '3445', '5666', '677899', ''
]

console.time()
// calUkeire.setCalRule('Menzu')

// console.log(calUkeire.ukeire2(hand7))
// console.log(calUkeire.ukeire1(hand10))
// console.log(calUkeire.analyze1(hand10))
// console.log(calUkeire.analyze2(hand9).tiles)
// console.log(calUkeire.ukeire2(hand9).tiles)
// console.log(suitMap.size)
console.log(suitStrsQuery(suitStr1, 'Riichi').tiles)
console.timeEnd()