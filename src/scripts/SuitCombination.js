// Calculate how many groups can be extracted in a suit
// For menzu hands only
// output: [maxGroups, maxTaatsus, maxTaatsusWithPair]

let suit = new Array(9)  // 0th position means tile 1
let residuals  // array of suit combinations with maximum number of groups removed

let isHonour
let groups  // current counter
let taatsus  // current counter
let pairs // current counter

let maxGroups  // running max
let maxTaatsus  // running max
let maxTaatsusWithPair  // running max

let suitMap = new Map()

export const suitToStr = (suit, isHonour) => {
  let s = ''
  if (isHonour){
    // Honours start with 0, then number of singletons, pairs, sets, and quads
    s = '0'
    const count = [0, 0, 0, 0]
    suit.forEach(tileCount => {
      if (tileCount > 0){
        count[tileCount - 1]++
      }
    })
    count.forEach(c => {
      s += c.toString()
    })
  } else {
    suit.forEach((tileCount, idx) => {
      const t = idx + 1
      const tileStr = t.toString()
      s += tileStr.repeat(tileCount)
    })
  }
  return s
}

export const calOptimalSuitCombination = (suit_, isHonour_ = false) => {
  
  const suitStr = suitToStr(suit_, isHonour_)

  var record = suitMap.get(suitStr)
  if(record) return record

  suit = suit_
  residuals = new Array()
  groups = 0
  taatsus = 0
  pairs = 0
  isHonour = isHonour_
  maxGroups = 0
  maxTaatsus = 0
  maxTaatsusWithPair = 0

  removeGroups()

  for (let residual of residuals){
    taatsus = 0
    pairs = 0
    suit = residual
    removeTaatsus()
    if(suitLen() <= 1 && pairs > 0){
      break
    }
  }

  const res = [maxGroups, maxTaatsus, maxTaatsusWithPair]
  suitMap.set(suitStr, res)
  return res
}

const removeGroups = (i = 0) => {

  if(groups > maxGroups){
    maxGroups = groups
    residuals = new Array()
  } else if(groups == maxGroups){
    residuals.push([...suit])
  }

  // i: start searching at this index
  if(i > suit.length){return groups}

  // skip to index with existing tile
  for(; i < suit.length && suit[i] == 0; i++){
    //empty
  }

  // triplet
  if(suit[i] >= 3){
    groups++
    suit[i] -= 3
    removeGroups(i)
    suit[i] += 3
    groups--
  }

  // run
  if(!isHonour && suit[i + 1] > 0 && suit[i + 2] > 0){
    groups++
    suit[i]--; suit[i + 1]--; suit[i + 2]--
    removeGroups(i)
    suit[i]++; suit[i + 1]++; suit[i + 2]++
    groups--
  }

  removeGroups(i + 1)
}

const removeTaatsus = (i = 0) => {

  if (taatsus > maxTaatsus){
    maxTaatsus = taatsus
  }

  if (pairs > 0 && taatsus > maxTaatsusWithPair){
    maxTaatsusWithPair = taatsus
  }

  // i: start searching at this index
  if(i > suit.length){return taatsus}

  // already optimal. Short circuiting

  // skip to index with existing tile
  for(; i < suit.length && suit[i] == 0; i++){
    //empty
  }

  // Pair
  if(suit[i] >= 2){
    taatsus++; pairs++
    suit[i] -= 2
    removeTaatsus(i)
    suit[i] += 2
    taatsus--; pairs--
  }

  // protorun
  if(!isHonour){
    if(suit[i + 1] > 0){
      taatsus++
      suit[i]--; suit[i + 1]--
      removeTaatsus(i)
      suit[i]++; suit[i + 1]++
      taatsus--
    }

    if(suit[i + 2] > 0){
      taatsus++
      suit[i]--; suit[i + 2]--
      removeTaatsus(i)
      suit[i]++; suit[i + 2]++
      taatsus--
    }
  }

  removeTaatsus(i + 1)
}

const suitLen = () => {
  return suit.reduce((a, b) => a + b, 0)
}