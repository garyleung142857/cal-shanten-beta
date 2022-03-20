import { calUkeire } from './Ukerie.js';
import { sumHand, tilesToHand, suitStrsToHand } from './Helper.js';


const queryHand = (hand, ruleName) => {
  const handLen = sumHand(hand)
  calUkeire.setCalRule(ruleName)
  if (handLen % 3 == 0){
    return { error: `Error: Hand contains ${handLen} tiles` }
  } else if (handLen % 3 == 1){
    return calUkeire.analyze1(hand)
  } else {
    return calUkeire.analyze2(hand)
  }
}


export const tilesQuery = (tiles, ruleName) => {
  const hand = tilesToHand(tiles)
  return queryHand(hand, ruleName)
}


export const suitStrsQuery = (suitStrs, ruleName) => {
  const hand = suitStrsToHand(suitStrs)
  return queryHand(hand, ruleName)
}