// Simple placeholder API helper using fetch
const BASE_URL = '' // e.g. 'https://api.example.com'

export async function getJSON(path) {
  const res = await fetch(BASE_URL + path)
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export default {
  getJSON,
}
