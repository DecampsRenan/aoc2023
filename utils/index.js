export async function getFileLines(fileName) {
  const file = Bun.file(fileName)
  const text =  await file.text()
  return text.split('\n').filter(Boolean)
}

export function showResult(result) {
  console.log('✅ Result: ', result)
}

export function createArray(length) {
  if (length <= 0) return []
  return Array.from(Array(length)).map((_, i) => i)
}

export function pause() {
  prompt("Press enter to continue")
}