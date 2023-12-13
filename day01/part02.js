const file = Bun.file('./data.txt')
const text = await file.text()
const lines = text.split('\n')

const dico = [...'1234567890'.split(''), 'one', 'two', 'three',  'four', 'five', 'six', 'seven', 'eight', 'nine']

const map = {
  '1': 1, 
  '2': 2,  '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '0': 0,  'one': 1,  'two': 2,  'three': 3,   'four': 4,  'five': 5,  'six': 6,  'seven': 7,  'eight': 8,  'nine': 9
} 

const findFirstMatch = (input, search, reverse = false) => {
  if (input === '') return null
  const result = !reverse ? input.indexOf(search) : input.lastIndexOf(search);
  if (result !== -1) return result
  return findFirstMatch(input.slice(1), search)
}

const asc = (a, b) => {
  if (a.index > b.index) return 1
  if (a.index < b.index) return -1
  return 0
}

const desc = (a, b) => {
  if (a.index > b.index) return -1
  if (a.index < b.index) return 1
  return 0
}



const result = lines.reduce((sum, line) => {

  const firstNumber = dico.map((dicoEntry) => {
    return {
      searchString: dicoEntry,
      index: findFirstMatch(line, dicoEntry)
    }
  }).filter(e => e.index !== null).sort(asc)[0].searchString

  let lastNumber = dico.map((dicoEntry) => {
    return {
      searchString: dicoEntry,
      index: findFirstMatch(line, dicoEntry, true)
    }
  }).filter(e => e.index !== null)
  console.log(lastNumber)
  
  lastNumber = lastNumber.sort(desc)[0].searchString

  console.log({
    firstNumber,
    lastNumber,
    line
  })

  return sum + +`${map[firstNumber]}${map[lastNumber]}`
}, 0);

console.log('✅ Result: ', result)