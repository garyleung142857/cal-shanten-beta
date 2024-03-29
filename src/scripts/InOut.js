import { calUkeire } from './Ukeire.js';
import { tilesToHand, checkHand } from './Helper.js';


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
  const hand = tilesToHand(tiles)
  const result = queryHand(hand, ruleName)
  return result
}
