import { calOptimalSuitCombination, suitToStr } from './SuitCombination.js'
import { applyMaskSuitPair, applyMaskSuitResidual, masks } from './Masking.js'


const handLength = (hand) => {
  let s = 0
  hand.forEach(suit => {
    suit.forEach(tileCount => {
      s += tileCount
    })
  })
  return s
}


const menzuTarget = (hand) => {
  // calculate the number of menzu needed with the length of hand
  let length = handLength(hand)
  return Math.floor(length / 3)
}


const calShantenMenzu = (hand, target = null) => {

  const menzuFormula = (deficit, taatsu, pairExists) => {
    if(taatsu < deficit + 1){
      return 2 * deficit - taatsu
    } else {
      return deficit - pairExists * 1
    }
  }

  const stats = [
    calOptimalSuitCombination(hand[0], false),  // man
    calOptimalSuitCombination(hand[1], false),  // pin
    calOptimalSuitCombination(hand[2], false),  // sou
    calOptimalSuitCombination(hand[3], true),  // zi
  ]
  
  if (!target){
    target = menzuTarget(hand)
  }

  const deficit = target - (stats[0][0] + stats[1][0] + stats[2][0] + stats[3][0])
  const maxTaatsus = stats[0][1] + stats[1][1] + stats[2][1] + stats[3][1]
  
  var shanten = menzuFormula(deficit, maxTaatsus, false)
  stats.forEach(suitStat => {
    // taatsus count when the required pair is fixed at the suit
    if (suitStat[2] > 0){
      const taatsus = maxTaatsus - suitStat[1] + suitStat[2]
      const shantenAssignedPair = menzuFormula(deficit, taatsus, true)
      shanten = Math.min(shanten, shantenAssignedPair)
    }
  })
  return shanten
}


const calShantenChiitoi = (hand) => {
  if (handLength(hand) < 13 || handLength(hand) > 14) return Infinity
  // only allow 7 unique pairs
  let pairs = 0
  let uniqueTiles = 0

  hand.forEach(suit => {
    suit.forEach(tileCount => {
      if (tileCount > 0){
        uniqueTiles++
      }
      if (tileCount >= 2){
        pairs++
      }
    })
  })

  let shanten = 6 - pairs
  if(uniqueTiles < 7){
    shanten += 7 - uniqueTiles
  }

  return shanten
}


const calShantenKokushi = (hand) => {
  if (handLength(hand) < 13 || handLength(hand) > 14) return Infinity
  let hasPair = false
  let uniqueTiles = 0
  // let kokushiTiles = new Array(13)
  const kokushiMasks = [
    masks.kokushiPlain,
    masks.kokushiPlain,
    masks.kokushiPlain,   
    masks.kokushiHonour
  ]

  for (let i = 0; i < 4; i++){
    const [match, pairExists] = applyMaskSuitPair(hand[i], kokushiMasks[i])
    uniqueTiles += match
    hasPair = pairExists || hasPair
  }

  return 13 - uniqueTiles - 1 * hasPair 
}


const calShantenSevenPairs = (hand) => {
  if (handLength(hand) < 13 || handLength(hand) > 14) return Infinity
  // allow identical pairs
  let pairs = 0

  hand.forEach(suit => {
    suit.forEach(tileCount => {
      if(tileCount == 2 || tileCount == 3){
        pairs++
      }
      if(tileCount == 4){
        pairs += 2
      }
    })
  })

  return 6 - pairs
}


const calShantenHonourAndKnittedTiles = (hand) => {
  if (handLength(hand) < 13 || handLength(hand) > 14) return Infinity
  let uniqueTiles = 0
  const s = []  // matching stat for plain suits
  
  for (let i = 0; i < 3; i++){
    var plainSuitStat = []
    masks.knit.forEach(mask => {
      plainSuitStat.push(applyMaskSuitResidual(hand[i], mask)[0])
    })
    s.push(plainSuitStat)
  }

  uniqueTiles = Math.max(
    s[0][0] + Math.max(s[1][1] + s[2][2], s[1][2] + s[2][1]),
    s[0][1] + Math.max(s[1][0] + s[2][2], s[1][2] + s[2][0]),
    s[0][2] + Math.max(s[1][1] + s[2][0], s[1][0] + s[2][1]),
  ) + applyMaskSuitResidual(hand[3], masks.kokushiHonour)[0]

  return 13 - uniqueTiles
}


const calShantenKnittedStraight = (hand) => {
  if (handLength(hand) < 10 || handLength(hand) > 14) return Infinity
  let bestShanten = Infinity  // lowest among 6 possible knits
  const residualTarget = menzuTarget(hand) - 3
  const fixedKnitShanten = (ms) => {
    let fixedKnitMatch = 0
    let residualHand = []
    for (let idx = 0; idx < 3; idx++){
      const [match, resi] = applyMaskSuitResidual(hand[idx], ms[idx])
      fixedKnitMatch += match
      residualHand.push(resi)
    }
    residualHand.push(hand[3])  // zi
    let residualShanten = Math.max(-1, calShantenMenzu(residualHand, residualTarget))
    return 9 - fixedKnitMatch + residualShanten
  }

  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (i != j){
        const fixedKnitMasks = [
          masks.knit[i],
          masks.knit[j],
          masks.knit[3 - i - j],
        ]  // one of 6 permutations of the masks
        bestShanten = Math.min(fixedKnitShanten(fixedKnitMasks), bestShanten)
      }
    }
  }

  return bestShanten
}


const calShantenLikgu = (hand) => {
  if (handLength(hand) < 16 || handLength(hand) > 17) return Infinity
  // 16 tiles, 7 pairs with a triplet. allow identical pairs
  let pairs = 0
  let hasTriplets = false

  hand.forEach(suit => {
    suit.forEach(tileCount => {
      if(tileCount == 2){
        pairs++
      }
      if(tileCount == 3){
        pairs++
        hasTriplets = true
      }
      if(tileCount == 4){
        pairs += 2
      }
    })
  })

  return 8 - pairs - 1 * hasTriplets
}


export let batDaapMap = new Map()

const calShantenBatDaap = (hand) => {
  if (handLength(hand) < 16 || handLength(hand) > 17) return Infinity
  // 16 tiles, 16 kinds tiles forming no taatsus. One kind consisting of a pair
  let matches = 0
  let pairExists = false
  for (let i = 0; i < 3; i++){
    let bestMatch = 0
    let pairExistsSuit = false
    const suitStr = suitToStr(hand[i], false)
    var record = batDaapMap.get(suitStr)
    if(record){
      [bestMatch, pairExistsSuit] = record
    } else {
      masks.batDaapPlain.forEach(mask => {
        const [matchesMask, pairExistsMask] = applyMaskSuitPair(hand[i], mask)
        if (matchesMask > bestMatch){
          bestMatch = matchesMask
          pairExistsSuit = false
        }
        if (matchesMask == bestMatch && pairExistsMask){
          pairExistsSuit = true
        }
      })

      batDaapMap.set(suitStr, [bestMatch, pairExistsSuit])
    }

    matches += bestMatch
    pairExists = pairExistsSuit || pairExists
  }

  // honour suit
  const [matchesMask, pairExistsMask] = applyMaskSuitPair(hand[3], masks.kokushiHonour)
  matches += matchesMask
  pairExists = pairExistsMask || pairExists

  return 16 - matches - pairExists * 1
}


const calShantenSapSaamJiu = (hand) => {
  if (handLength(hand) < 16 || handLength(hand) > 17) return Infinity
  // 16 tiles. Kokushi hand (14 tiles) plus a group (3 tiles, concealed)
  let terminalMatches = 0

  const kokushiMasks = [
    masks.kokushiPlain,
    masks.kokushiPlain,
    masks.kokushiPlain,   
    masks.kokushiHonour
  ]

  let hand_ = [
    [...hand[0]], [...hand[1]], [...hand[2]], [...hand[3]]
  ]

  let terminalPairs = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ]  // for optimizing by checking which pair to use


  for (let i = 0; i < 4; i++){
    for (let j = 0; j < hand_[i].length; j++){
      if(kokushiMasks[i][j] && hand_[i][j]){
        terminalMatches++
        if(hand_[i][j] >= 2){
          terminalPairs[i][j] = 1
        }
        hand_[i][j]--
      }
    }
  }

  // give a pair to the residual hand as we already have a pair in terminals
  hand_[3].push(2)
  let bestResidualShanten = Math.max(-1, calShantenMenzu(hand, 1)) + 1
  hand_[3].pop()

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < hand_[i].length; j++){
      if(terminalPairs[i][j]){
        hand_[i][j]--
        // give a pair to the residual hand as we already have a pair in terminals
        hand_[3].push(2)
        bestResidualShanten = Math.min(
          Math.max(-1, calShantenMenzu(hand, 1)), bestResidualShanten
        )
        hand_[i][j]++
        hand_[3].pop()
      }
    }
  }

  return 13 - terminalMatches + bestResidualShanten
}


export const cal = {
  calShantenMenzu,
  calShantenChiitoi,
  calShantenSevenPairs,
  calShantenKokushi,
  calShantenHonourAndKnittedTiles,
  calShantenKnittedStraight,
  calShantenLikgu,
  calShantenBatDaap,
  calShantenSapSaamJiu
}

// rules

const ruleMenzu = [
  cal.calShantenMenzu
]

const ruleHK = [
  cal.calShantenMenzu,
  cal.calShantenKokushi
]

const ruleRiichi = [
  cal.calShantenMenzu,
  cal.calShantenKokushi,
  cal.calShantenChiitoi
]

const ruleZungJung = [
  cal.calShantenMenzu,
  cal.calShantenKokushi,
  cal.calShantenSevenPairs
]

const ruleMCR = [
  cal.calShantenMenzu,
  cal.calShantenKokushi,
  cal.calShantenSevenPairs,
  cal.calShantenHonourAndKnittedTiles,
  cal.calShantenKnittedStraight
]

const ruleTaiwan = [
  cal.calShantenMenzu
]

const ruleHKTW = [
  cal.calShantenMenzu,
  cal.calShantenSapSaamJiu,
  cal.calShantenLikgu,
  cal.calShantenBatDaap
]

const rules = {
  'Menzu': ruleMenzu,
  'HK': ruleHK,
  'Riichi': ruleRiichi,
  'ZungJung': ruleZungJung,
  'MCR': ruleMCR,
  'Taiwan': ruleTaiwan,
  'HKTW': ruleHKTW
}


export const calShantenRule = (ruleName='Menzu') => {
  return (hand) => {
    const rule = rules[ruleName]
    const minShantens = rule.map(calShape => calShape(hand))
    return Math.min(...minShantens)
  }
}

