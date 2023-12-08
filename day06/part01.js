import { createArray, getFileLines, showResult } from "../utils";

const [[,...times], [,...distances]] = (await getFileLines('input')).map(l => l.split(' ').filter(Boolean))

const races = times.map((t, i) => [+t, +distances[i]])
console.log(races)

const result = races.reduce((marginError, [time, distance]) => {
  console.log('')
  console.log(`time:     ${time}`)
  console.log(`distance: ${distance}`)
  const estimatedRaceDistance = createArray(time).map((currentTime) => {
    const speed = currentTime
    const currentDistance = speed * (time - currentTime)
    return currentDistance
  });

  const nbWayToWin = estimatedRaceDistance.reduce((waysToWin, currentEstimatedRaceTime, i) => {
    return currentEstimatedRaceTime > distance ? waysToWin + 1 : waysToWin
  }, 0)

  return marginError * nbWayToWin;
}, 1)

showResult(result)