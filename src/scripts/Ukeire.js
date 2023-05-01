import { reduceHand, FULLSET, emptyHand, tileNames } from './Helper.js'
import { RuleSet, setHandLength } from 'mahjong-tile-efficiency'

// Sanma rule that allow indentical pair 7 pair is effectively Zung Jung
// Use 12 / 13 tiles with a joker to calculate shanten, 
// is basically calculating with the 12 / 13 tiles, and minus 1

const newHandLengthFunc = (hand) => {
  let s = 1
  hand.forEach(suit => {
    suit.forEach(tileCount => {
      s += tileCount
    })
  })
  return s
}

setHandLength(newHandLengthFunc)

let ruleset = new RuleSet('ZungJung')
let calRule = (hand) => {
  for (let i = 1; i <= 7; i++) {
    if (hand[0][i] > 0) {
      return Infinity
    }
  }
  return ruleset.calShanten(hand) - 1
}

const ukeire1 = (hand) => {
  // for 3n + 1 hands
  let ukeireList = []
  let totalUkeire = 0
  const originalShanten = Math.max(calRule(hand), 0)  // at least 0, since not completed

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < FULLSET[i].length; j++){
      const remainingCount = FULLSET[i][j] - hand[i][j]
      if (remainingCount > 0){
        hand[i][j]++
        const newShanten = calRule(hand)
        hand[i][j]--
        if (newShanten < originalShanten){
          ukeireList.push(tileNames[i][j])
          totalUkeire += remainingCount
        }
      }
    }
  }
  return {
    ukeireList: ukeireList,
    totalUkeire: totalUkeire,
    shanten: originalShanten,
  }
}


const ukeire2 = (hand) => {
  // for 3n + 2 hands
  // consider every tile, even if shanten increases
  const originalShanten = calRule(hand)
  // let ukeires = emptyHand()
  let bestUkeire = 0
  
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < FULLSET[i].length; j++){
      if(hand[i][j] > 0){
        hand[i][j]--
        const newUkeire = ukeire1(hand)
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
  let ukeireList = {}
  let ukeireImprovement = {}
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
          if(newUkeire.best > thisUkeire.totalUkeire){
            ukeireImprovement[tileNames[i][j]] = newUkeire.best
          }
        } else if (newUkeire.shanten < originalShanten){
          ukeireList[tileNames[i][j]] = newUkeire.best
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
    improvedUkeire: ukeireImprovement,
    ukeire: thisUkeire.totalUkeire,
    ukeireList: ukeireList,
    avgWithImprovement: totalUkeire / totalTiles,
    avgNextUkeire: avgNextUkeire,
    speedRef: speed
  }
}


const analyze2 = (hand) => {
  const originalShanten = calRule(hand)
  let analysis = emptyHand()
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
    const tiles = reduceHand(analysis)
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
  if(aa.shanten == bb.shanten){
    if (aa.speedRef == null || bb.speedRef == null || aa.speedRef == bb.speedRef){
      if(aa.ukeire == bb.ukeire){
        if(aa.avgWithImprovement == bb.avgWithImprovement){
          return aa.avgNextUkeire > bb.avgNextUkeire ? -1 : 1
        }
        return aa.avgWithImprovement > bb.avgWithImprovement ? -1 : 1
      }
      return aa.ukeire > bb.ukeire ? -1 : 1
    }
    return aa.speedRef > bb.speedRef ? -1 : 1
  }
  return aa.shanten > bb.shanten ? 1 : -1
}

export const calUkeire = {
  ukeire1,
  ukeire2,
  analyze1,
  analyze2
}