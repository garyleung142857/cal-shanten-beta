import { calUkeire } from './Ukeire.js';
import { tilesToHand, suitStrsToHand, checkHand } from './Helper.js';


const queryHand = (hand, ruleName) => {
  let state = null
  try{
    state = checkHand(hand, ruleName)
  } catch (e) {
    return { error: e }
  }
  calUkeire.setCalRule(ruleName)
  if (state == 'To draw'){
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