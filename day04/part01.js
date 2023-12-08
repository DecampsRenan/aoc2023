import { createArray, getFileLines, showResult } from "../utils";

const cards = (await getFileLines('input'))
  .map(line => line.split(':')[1].split('|').map(numbers => numbers.trim().split(' ').filter(Boolean).map(n => +n)))

const result = cards.reduce((points, [winningNumbers, numbersWeHave]) => {
  console.log('')
  console.log(`Winning numbers ${winningNumbers}`)
  console.log(`Numbers ${numbersWeHave}`)

  const uniqueNumbers = numbersWeHave.filter(n => winningNumbers.includes(n))
  console.log(`Common numbers: ${uniqueNumbers}`)
  
  if (!uniqueNumbers.length) return points

  const cardPoints = createArray(uniqueNumbers.length - 1).reduce((acc, i) => acc * 2, 1)

  return points + cardPoints
}, 0)

showResult(result)
