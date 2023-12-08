export async function getFileLines() {
  const file = Bun.file('input')
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