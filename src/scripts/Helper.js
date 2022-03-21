const tileNames = [
  ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m'],
  ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p'],
  ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'],
  ['1z', '2z', '3z', '4z', '5z', '6z', '7z'],
]


export const reduceHand = (hand, detailed=true) => {
  let resList = []
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < tileNames[i].length; j++){
      if (hand[i][j]){
        if (detailed){
          resList.push({
            tile: tileNames[i][j],
            analysis: hand[i][j]
          })
        } else {
          resList.push(tileNames[i][j])
        }
      }
    }
  }
  return resList
}


export const FULLSET = [
  [4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4]
]


export const emptyHand = () => [
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
]


export const sumHand = (hand) => {
  let s = 0
  hand.forEach(suit => {
    suit.forEach(tileCount => {
      if (tileCount){
        s += tileCount
      }
    })
  })
  return s
}

export const suitStrToSuit = (suitStr, isHonour) => {
  let len = isHonour ? 7 : 9
  let suit = new Array(len).fill(0)
  for (let j = 0; j < suitStr.length; j++){
    let c = parseInt(suitStr[j])
    if (c >= 1 && c <= len){
      suit[c - 1]++
    }
  }
  return suit
}


export const suitStrsToHand = (suitsStrArr) => {
  let hand = []
  for (let i = 0; i < 4; i++){
    const isHonour = (i == 3)
    hand.push(suitStrToSuit(suitsStrArr[i], isHonour))
  }
  return hand
}


export const tilesToHand = (tilesArr) => {
  let hand = [
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(7).fill(0),
  ]

  for (let i = 0; i < 4; i++){
    for (let j = 0; j < hand[i].length; j++){
      for (let tileName of tilesArr){
        if (tileName == tileNames[i][j]){
          hand[i][j]++
        }
      }
    }
  }

  return hand
}

export const checkHand = (hand, ruleName) =>{
  const handLen = sumHand(hand)
  if (handLen % 3 == 0 || handLen > rulesMax[ruleName]){
    throw `Error: Hand contains ${handLen} tiles`
  } else {
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < hand[i].length; j++){
        if (hand[i][j] > 4){
          throw `Error: Tile ${tileNames[i][j]} contains ${hand[i][j]} copies.`
        }
      }
    }
  }
  if (handLen % 3 == 1){
    return 'To draw'
  } else {
    return 'To play'
  }
}

export const rulesNames = [
  'Menzu',
  'HK',
  'Riichi',
  'ZungJung',
  'MCR',
  'Taiwan',
  'HKTW'
]

export const rulesMax = {
  'Menzu': Infinity,
  'HK': 14,
  'Riichi': 14,
  'ZungJung': 14,
  'MCR': 14,
  'Taiwan': 17,
  'HKTW': 17
}