export const tileNames = [
  ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m'],
  ['1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p'],
  ['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s'],
  ['1z', '2z', '3z', '4z', '5z', '6z', '7z'],
]


export const reduceHand = (hand) => {
  let resList = []
  for (let i = 0; i < 4; i++){
    for (let j = 0; j < tileNames[i].length; j++){
      if (hand[i][j]){
        resList.push({
          tile: tileNames[i][j],
          analysis: hand[i][j]
        })
      }
    }
  }
  return resList
}


export const FULLSET = [
  Array(9).fill(4),
  Array(9).fill(4),
  Array(9).fill(4),
  Array(7).fill(4)
]


export const emptyHand = () => [
  Array(9).fill(null),
  Array(9).fill(null),
  Array(9).fill(null),
  Array(7).fill(null),
]


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

export const checkHand = (hand) =>{
  const handLen = hand.reduce(
    (a, b) => a.concat(b), []
  ).reduce((a, b) => a + b, 0)
  if (handLen % 3 == 2 || handLen > 13){
    throw {error: 'handLen', len: handLen}
  } else {
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < hand[i].length; j++){
        if (hand[i][j] > 4){
          throw {error: 'extraCopies', tile: tileNames[i][j], count: hand[i][j]}
        }
      }
    }
  }
  if (handLen % 3 == 0){
    return 'To draw'
  } else {
    return 'To play'
  }
}

export const sortHand = (hand) => {
  const SUITS = ['m', 'p', 's', 'z']
  const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  hand.sort((a, b) => {
    const rankDiff = SUITS.indexOf(a[1]) - SUITS.indexOf(b[1])
    if(SUITS.indexOf(a[1]) == SUITS.indexOf(b[1])){
      return RANKS.indexOf(a[0]) > RANKS.indexOf(b[0]) ? 1 : -1
    }
    return rankDiff > 0 ? 1 : -1
  })
}

export const checkTile = (tileName) => {
  return tileNames.some(suit => suit.includes(tileName))
}
