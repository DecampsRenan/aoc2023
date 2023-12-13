import { getFileLines, pause, showResult } from "../utils";

type CorrectNumbers = Array<number>
type GotNumbers = Array<number>

type LineEntry = [CorrectNumbers, GotNumbers, number]

type Line = [number, LineEntry]

let cards: Array<Line> = (await getFileLines('input')).map(line => {
  const cardId = +line.split(':')[0].split(' ').filter(Boolean)[1].trim();

  const numbers = line.split(':')[1]
  const winningNumbers = numbers.split('|')[0].split(' ').filter(Boolean).map(n => +n)
  const numbersWeHave = numbers.split('|')[1].split(' ').filter(Boolean).map(n => +n)
  return [
    cardId,
    [winningNumbers, numbersWeHave, 1]
  ]
})

function prettyPrint(cards: Array<Line>) {
  cards.forEach(([cardNumber, [correct, got, size]]) => console.log(`Card ${cardNumber}: ${size}`))
}

prettyPrint(cards)

let result = 0
const CARD_NUMBER = 0
const NUMBERS = 1

const WINNING_NUMBERS = 0
const NUMBERS_WE_HAVE = 1
const NB_LINES = 2

for (let cardIndex = 0; cardIndex < cards.length; ++cardIndex) {
  const [cardNumber, lineEntries] = cards[cardIndex]

  const [winningNumbers, numbersWeHave, nbLines] = lineEntries
  // Compute winning numbers
  const correctNumbersSize = winningNumbers.filter(n => numbersWeHave.includes(n)).length ?? 0;
  console.log(`Card ${cardNumber}: ${nbLines}, will add ${correctNumbersSize}`)
  
  // For each correct value, add one more line to the corresponding card number
  for(let i = 0; i < correctNumbersSize; ++i) {
    if (!cards[cardIndex + i + 1]) break
    cards[cardIndex + i + 1][NUMBERS][NB_LINES] += nbLines
  }
}

showResult(cards.reduce((sum, c) => sum + c[NUMBERS][NB_LINES], 0))
