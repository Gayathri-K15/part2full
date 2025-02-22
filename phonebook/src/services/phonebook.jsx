import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

// Fetch all persons
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Create a new person
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// Update an existing person's details
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Delete a person by ID
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(() => id)
}

export default { 
  getAll, 
  create, 
  update, 
  remove 
}
