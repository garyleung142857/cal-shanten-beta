import { calUkeire } from './Ukeire.js';
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
  return new Promise((resolve, reject) => {
    const hand = tilesToHand(tiles)
    const result = queryHand(hand, ruleName)
    if (result['error']){
      reject(result['error'])
    } else {
      resolve(result)
    }
  })
}


export const suitStrsQuery = (suitStrs, ruleName) => {
  return new Promise((resolve, reject) => {
    const hand = suitStrsToHand(suitStrs)
    const result = queryHand(hand, ruleName)
    if (result['error']){
      reject(result['error'])
    } else {
      resolve(result)
    }
  })
}