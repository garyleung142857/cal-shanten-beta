import { reduceHand, FULLSET, emptyHand, sumHand } from './Helper.js'
import { calShantenRule } from './CalShanten.js'


let calRule


const setCalRule = (ruleName) => {
  calRule = calShantenRule(ruleName)
}


const ukeire1 = (hand) => {
  // for 3n + 1 hands
  let ukeires = emptyHand()
  const originalShanten = calRule(hand)  // at least 0, since not completed

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < FULLSET[i].length; j++){
      const remainingCount = FULLSET[i][j] - hand[i][j]
      if (remainingCount > 0){
        hand[i][j]++
        const newShanten = calRule(hand)
        hand[i][j]--
        if (newShanten < originalShanten){
          ukeires[i][j] = remainingCount
        }
      }
    }
  }
  return {
    ukeire: ukeires,
    ukeireList: reduceHand(ukeires, false),
    totalUkeire: sumHand(ukeires),
    shanten: originalShanten,
    
  }
}


const ukeire2 = (hand) => {
  // for 3n + 2 hands
  // consider every tile, even if shanten increases
  const originalShanten = calRule(hand)
  let ukeires = emptyHand()
  let bestUkeire = 0
  
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < FULLSET[i].length; j++){
      if(hand[i][j] > 0){
        hand[i][j]--
        const newUkeire = ukeire1(hand)
        ukeires[i][j] = [
          newUkeire.shanten,
          newUkeire.totalUkeire,
          newUkeire.ukeireList
        ]
        if(newUkeire.shanten == originalShanten && newUkeire.totalUkeire > bestUkeire){
          bestUkeire = newUkeire.totalUkeire
        }
        hand[i][j]++
      }
    }
  }
  return {
    best: bestUkeire,
    shanten: originalShanten,
    tiles: ukeires
  }
}


const analyze1 = (hand) => {
  let totalTiles = 0
  let totalUkeire = 0
  // let ukeireImprovment = emptyHand()
  let nextShantenTiles = 0
  let nextShantenUkeire = 0
  const thisUkeire = ukeire1(hand)
  const originalShanten = thisUkeire.shanten

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < FULLSET[i].length; j++){
      const remainingCount = FULLSET[i][j] - hand[i][j]
      if (remainingCount > 0){
        hand[i][j]++
        const newUkeire = ukeire2(hand)
        hand[i][j]--
        if(newUkeire.shanten == originalShanten){
          totalTiles += remainingCount
          totalUkeire += remainingCount * newUkeire.best
          // ukeireImprovment[i][j] = newUkeire.best
        } else if (newUkeire.shanten < originalShanten){
          nextShantenTiles += remainingCount
          nextShantenUkeire += remainingCount * newUkeire.best
        }
      }
    }
  }
  return {
    shanten: originalShanten,
    // improvedUkerie: ukeireImprovment,
    ukeire: thisUkeire.totalUkeire,
    avgWithImprovment: totalUkeire / totalTiles,
    avgNextUkeire: nextShantenUkeire / nextShantenTiles
  }
}


const analyze2 = (hand) => {
  const originalShanten = calRule(hand)
  let analysis = emptyHand()
  // let bestUkeireImprovment = 0

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < FULLSET[i].length; j++){
      if(hand[i][j] > 0){
        hand[i][j]--
        const newAnalysis = analyze1(hand)
        analysis[i][j] = newAnalysis
        hand[i][j]++
      }
    }
  }
  return {
    shanten: originalShanten,
    tiles: reduceHand(analysis, true)
  }
}


export const calUkeire = {
  setCalRule,
  ukeire1,
  ukeire2,
  analyze1,
  analyze2
}