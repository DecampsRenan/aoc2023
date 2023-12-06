const file = Bun.file('./data.txt')

const text =  await file.text()
const lines = text.split('\n')

const dico = '1234567890'.split('')

const result = lines.reduce((sum, line) => {

  const firstNumber = line.split('').find(char => dico.includes(char))
  const lastNumber = line.split('').reverse().find(char => dico.includes(char))

  console.log({
    firstNumber,
    lastNumber,
    line
  })

  return sum + +`${firstNumber}${lastNumber}`
}, 0);

console.log('✅ Result: ', result)