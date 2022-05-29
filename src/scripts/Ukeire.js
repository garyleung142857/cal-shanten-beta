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


const speedRef = (ukeire, avgNextUkeire, leftTurns) => {
  if (ukeire == 0 || avgNextUkeire == 0){
    return 0
  } else {
    const leftCount = 120
    const p2 = ukeire / leftCount
    const p1 = avgNextUkeire / leftCount
    const q2 = 1 - p2
    const q1 = 1 - p1
    // probability of advancing twice in leftTurns turns (approximate)
    // 1-shanten: 10 turns, 2-shanten: 3 turns
    const result = 1 - (p2 * Math.pow(q1, leftTurns) - p1 * Math.pow(q2, leftTurns)) / (q1 - q2)
    return result * 100
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

  const avgNextUkeire = nextShantenUkeire / nextShantenTiles
  let speed
  if (originalShanten == 1){
    speed = speedRef(thisUkeire.totalUkeire, avgNextUkeire, 10)
  } else if (originalShanten == 2){
    speed = speedRef(thisUkeire.totalUkeire, avgNextUkeire, 3)
  }

  return {
    shanten: originalShanten,
    // improvedUkeire: ukeireImprovment,
    ukeire: thisUkeire.totalUkeire,
    ukeireList: thisUkeire.ukeireList,
    avgWithImprovment: totalUkeire / totalTiles,
    avgNextUkeire: avgNextUkeire,
    speedRef: speed
  }
}


const analyze2 = (hand) => {
  const originalShanten = calRule(hand)
  let analysis = emptyHand()
  // let bestUkeireImprovment = 0
  if(originalShanten >= 0){
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
    const tiles = reduceHand(analysis, true)
    const sortedTiles = tiles.sort(sortFunc)

    return {
      shanten: originalShanten,
      tiles: sortedTiles
    }
  }else {
    return {
      shanten: -1
    }
  }
}


const sortFunc = (a, b) => {
  const aa = a.analysis
  const bb = b.analysis
  if(aa.shanten == 0 && bb.shanten == 0){
    if (aa.ukeire == bb.ukeire){
      return aa.avgWithImprovment > bb.avgWithImprovment ? -1 : 1
    }
    return aa.ukeire > bb.ukeire ? -1 : 1
  }
  if(aa.shanten == bb.shanten){
    return aa.speedRef > bb.speedRef ? -1 : 1
  }
  return aa.shanten > bb.shanten ? 1 : -1
}


export const calUkeire = {
  setCalRule,
  ukeire1,
  ukeire2,
  analyze1,
  analyze2
}