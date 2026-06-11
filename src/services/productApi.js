const BASE_URL = 'http://localhost:8080/api/products'

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

function normalizeProducts(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data ? [data] : []
}

export async function getProducts() {
  const response = await fetch(BASE_URL)
  const data = await handleResponse(response)
  return normalizeProducts(data)
}
