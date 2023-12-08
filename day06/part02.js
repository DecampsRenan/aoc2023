import { createArray, getFileLines, showResult } from "../utils";

const [[,...time], [,...distance]] = (await getFileLines('input')).map(l => l.split(' ').filter(Boolean))

const effectiveTime = +time.join('')
const effectiveDistance = +distance.join('')

console.log('')
console.log(`time:     ${effectiveTime}`)
console.log(`distance: ${effectiveDistance}`)
const estimatedRaceDistance = createArray(effectiveTime).map((currentTime) => {
  const speed = currentTime
  const currentDistance = speed * (effectiveTime - currentTime)
  return currentDistance
});

const nbWayToWin = estimatedRaceDistance.reduce((waysToWin, currentEstimatedRaceTime, i) => {
  return currentEstimatedRaceTime > effectiveDistance ? waysToWin + 1 : waysToWin
}, 0)

const result = nbWayToWin;

showResult(result)