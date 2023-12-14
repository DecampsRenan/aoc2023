import { getFileLines, showResult } from "../utils";

function prettyPrint(hand) {
  hand.forEach(line => console.log(`${line[0]} ${line[1]}`))
}
const lines = await getFileLines('input')

const cards = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()

const Levels = {
  'Five of a kind': [],
  'Four of a kind': [],
  'Full house': [],
  'Three of a kind': [],
  'Two pair': [],
  'One pair': [],
  'High card': []
}

const isFiveOfKind = () => {

}

class Hand {
  level = 'High card'
  hand = ''
  bid = 0

  constructor(line) {
    const [hand, bid] = line.split(' ')
    this.hand = hand;
    this.bid = parseInt(bid, 10);

    this.level = this.computeLevel()
  }

  computeLevel() {
    // Test if it is a Five of kind
    if (this.getMaxCardCount() === 5) {
      Levels['Five of a kind'].push(this)
      return 'Five of a kind'
    }
    if (this.getMaxCardCount() === 4) {
      Levels['Four of a kind'].push(this)
      return 'Four of a kind'
    }
    
    
    const count = this.getCardCounts()
    if (this.getMaxCardCount() === 3) {
      const set = new Set(Object.values(count))
      if (set.has(2)) {
        Levels['Full house'].push(this)
        return 'Full house'
      }

      Levels['Three of a kind'].push(this)
      return  'Three of a kind'
    }

    if (this.getMaxCardCount() === 2) {
      const array = Object.values(count)
      if (array.length === 3) {
        Levels['Two pair'].push(this)
        return 'Two pair'
      }

      Levels['One pair'].push(this)
      return 'One pair'
    }

    Levels['High card'].push(this)
    return 'High card'
  }

  getCardCounts() {
    return this.hand.split('').reduce((acc, h) => ({
      ...acc,
      [h]: (acc?.[h] || 0) + 1 
    }), {});
  }

  getMaxCardCount() {
    return Math.max(...Object.values(this.getCardCounts()))
  }

  getPoints() {
    return Levels[this.level] * this.bid
  }

  compareTo(b) {
    const aHand = this.hand.split('')
    const bHand = b.hand.split('')

    console.log('comparing',this.hand, b.hand)

    const result = aHand.reduce((acc, aCard, i) => {
      if (acc !== 0) return acc

      const bCard = bHand[i]
      if (aCard === bCard) return 0

      if (cards.indexOf(aCard) > cards.indexOf(bCard)) return -1
      return 1
    }, 0)

    return result
  }

  toString() {
    return `${this.hand} '${this.bid}' - ${this.level}`
  }
}

lines.map(line => new Hand(line))

const newLevels = Object.entries(Levels).reduce((acc, [level, levelHands]) => {
  levelHands.sort((a, b) => a.compareTo(b))
  return {
    ...acc,
    [level]: levelHands
  };
}, {})

const sortedCards = [
  ...Levels['Five of a kind'],
  ...Levels['Four of a kind'],
  ...Levels['Full house'],
  ...Levels['Three of a kind'],
  ...Levels['Two pair'],
  ...Levels['One pair'],
  ...Levels['High card']
].reverse();

sortedCards.forEach(c => console.log(c.toString()))

const result = sortedCards.filter(Boolean).reduce((sum, hand, i) => sum + (hand.bid * (i+1)), 0)

showResult(result)