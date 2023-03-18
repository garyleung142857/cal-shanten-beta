export const applyMaskSuitPair = (suit_, suitMask) => {
  // suit: an array of tileCount
  // suitMask, a 0-1 array with same dimension with suit
  // 1 means targeted tile
  // will be awared of pair
  // will return number of tiles matched and whether pair exists
  let suit = [...suit_]
  let count = 0
  let pairExists = false
  for (let i = 0; i < suitMask.length; i++){
    if (suitMask[i] && suit[i]){
      count++
      if (suit[i] >= 2){
        pairExists = true
      }
    }
  }

  return [count, pairExists]
}


export const applyMaskSuitResidual = (suit_, suitMask) => {
  // suit: an array of tileCount
  // suitMask, a 0-1 array with same dimension with suit
  // 1 means targeted tile
  // will be ignorance of pair
  // return number of tiles matched and remaining tiles

  let suit = [...suit_]
  let count = 0
  for (let i = 0; i < suitMask.length; i++){
    if (suitMask[i] && suit[i]){
      count++
      suit[i]--
    }
  }

  return [count, suit]
}

const kokushiPlain = [1, 0, 0, 0, 0, 0, 0, 0, 1]
const kokushiHonour = [1, 1, 1, 1, 1, 1, 1]

const knit = [
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1]
]

const batDaapPlain = [
  [1, 0, 0, 1, 0, 0, 1, 0, 0],  // 147
  [1, 0, 0, 1, 0, 0, 0, 1, 0],  // 148
  [1, 0, 0, 1, 0, 0, 0, 0, 1],  // 149
  [1, 0, 0, 0, 1, 0, 0, 1, 0],  // 158
  [1, 0, 0, 0, 1, 0, 0, 0, 1],  // 159
  [1, 0, 0, 0, 0, 1, 0, 0, 1],  // 169
  [0, 1, 0, 0, 1, 0, 0, 1, 0],  // 258
  [0, 1, 0, 0, 1, 0, 0, 0, 1],  // 259
  [0, 1, 0, 0, 0, 1, 0, 0, 1],  // 269
  [0, 0, 1, 0, 0, 1, 0, 0, 1],  // 369
]

export const masks = {
  kokushiPlain,
  kokushiHonour,
  knit,
  batDaapPlain
}