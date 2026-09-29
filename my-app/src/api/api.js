const API_URL = 'http://localhost/Voxera-vite/my-app/backend'

export async function getRanks() {
  const response = await fetch(`${API_URL}/ranks.php`)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json()
}