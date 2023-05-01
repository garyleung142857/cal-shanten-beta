import { calUkeire } from './Ukeire.js';
import { tilesToHand, checkHand } from './Helper.js';


const queryHand = (hand) => {
  let state = null
  try{
    state = checkHand(hand)
  } catch (e) {
    return { error: e }
  }
  if (state == 'To draw'){
    return calUkeire.analyze1(hand)
  } else {
    return calUkeire.analyze2(hand)
  }
}


export const tilesQuery = (tiles) => {
  const hand = tilesToHand(tiles)
  const result = queryHand(hand)
  return result
}
