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

export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(response)
}

export async function createProduct({ name, description, price, category, quantity }) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price, category, quantity })
  })
  return handleResponse(response)
}

export async function updateProduct(id, { name, description, price, category, quantity }) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, description, price, category, quantity })
  })

  return handleResponse(response)
}

export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })

  return handleResponse(response)
}