const file = Bun.file('input')
const text =  await file.text()
const lines = text.split('\n').filter(Boolean)

const gameState = {
  red: 12,
  green: 13,
  blue: 14
}

function getGameId(line) {
  return line.split(' ')[1].split(':')[0]
}

function getNbGames(line) {
  return line.split(':')[1].split(';').length
}

function getRedCubes(line, currentGameIndex) {
  return +(line.split(':')[1].split(';')[currentGameIndex].match(/(\d)+(?= red)/g)?.[0] || 0)
}

function getGreenCubes(line, currentGameIndex) {
  return +(line.split(':')[1].split(';')[currentGameIndex].match(/(\d)+(?= green)/g)?.[0] || 0)
}

function getBlueCubes(line, currentGameIndex) {
  return +(line.split(':')[1].split(';')[currentGameIndex].match(/(\d)+(?= blue)/g)?.[0] || 0)
}

const result = lines.reduce((sum, line) => {
  const gameId = +getGameId(line);
  const nbGames = getNbGames(line);
  console.log(line)
  console.log(`${gameId} - ${nbGames}`)

  const minimunSet = Array.from([...Array(nbGames)]).reduce((acc, _, currentGameIndex) => {
    if (!acc) return false
    const currentTriage = {
      red: getRedCubes(line, currentGameIndex),
      green: getGreenCubes(line, currentGameIndex),
      blue: getBlueCubes(line, currentGameIndex),
    }

    return {
      red: acc.red < currentTriage.red ? currentTriage.red : acc.red,
      green: acc.green < currentTriage.green ? currentTriage.green : acc.green,
      blue: acc.blue < currentTriage.blue ? currentTriage.blue : acc.blue,
    }
    
  }, { red: 0, blue: 0, green: 0 });

  const power = minimunSet.red * minimunSet.blue * minimunSet.green
  console.log(minimunSet)
  console.log(`Power: ${power}`)
  console.log('')

  return sum + power
}, 0)


console.log('✅ Result: ', result)