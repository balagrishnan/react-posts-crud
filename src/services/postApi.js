const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getPosts() {
  const response = await fetch(BASE_URL)
  return handleResponse(response)
}

export async function getPost(id) {
  const response = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(response)
}

export async function createPost({ title, body, userId = 1 }) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body, userId }),
  })
  return handleResponse(response)
}

export async function updatePost(id, { title, body, userId }) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title, body, userId }),
  })
  return handleResponse(response)
}

export async function deletePost(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}
