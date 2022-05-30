import { tilesQuery, suitStrsQuery } from './InOut'

const calculations = { tilesQuery, suitStrsQuery }

self.addEventListener('message', (event) => {
  postMessage({key: 'working', value: true })
  if(Object.keys(calculations).includes(event.data.method)){
    postMessage({
      key: 'queryResults',
      value: calculations.tilesQuery(...event.data.args)
    })
  } else {
    postMessage({
      key: 'error',
      value: `No calculation found ${event.data.method ? `for type ${event.data.method}` : ''}`,
    })
  }
  postMessage({ key: 'working', value: false });
})