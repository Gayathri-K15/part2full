const express = require('express');
const morgan = require('morgan'); // Import morgan
const cors = require('cors'); // Import cors
const app = express();
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // To parse JSON bodies for POST requests

// Custom Morgan token to log the POST request body
morgan.token('body', (req) => {
  // Only log the body if it's a POST request (to avoid logging it for GET/DELETE/etc.)
  if (req.method === 'POST' && req.body) {
    return JSON.stringify(req.body); // Convert the body to a JSON string
  }
  return ''; // Empty string if not a POST request or no body exists
});

// Add Morgan logging middleware with custom format that includes POST body
app.use(morgan(':method :url :status :response-time ms :body')); // Custom format

// Hardcoded phonebook data
let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

// Route to get all persons (Phonebook entries)
app.get('/api/persons', (req, res) => {
  res.json(persons);
});

// Route to show info (time of request and number of phonebook entries)
app.get('/info', (req, res) => {
  const currentTime = new Date(); // Get the current time
  const phonebookEntriesCount = persons.length; // Get the number of phonebook entries

  // Sending response with time of request and phonebook entries count
  res.send(`
    <h1>Phonebook Information</h1>
    <p>Request received at: ${currentTime}</p>
    <p>There are ${phonebookEntriesCount} entries in the phonebook.</p>
  `);
});

// Route to get a single phonebook entry by ID
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id; // Get the ID from the URL parameter
  const person = persons.find(p => p.id === id); // Find the person with the matching ID

  if (person) {
    res.json(person); // If person is found, return their details as JSON
  } else {
    res.status(404).json({ error: 'Person not found' }); // If not found, return a 404 status with an error message
  }
});

// DELETE route to remove a phonebook entry by ID
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id; // Get the ID from the URL parameter
  const personIndex = persons.findIndex(p => p.id === id); // Find the index of the person to delete

  if (personIndex !== -1) {
    persons.splice(personIndex, 1); // Remove the person from the array
    res.status(204).end(); // Respond with a 204 status code (No Content) indicating successful deletion
  } else {
    res.status(404).json({ error: 'Person not found' }); // If the person is not found, return a 404 status
  }
});

// POST route to add a new person to the phonebook
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body; // Get name and number from the request body

  // Check if the name or number is missing
  if (!name || !number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  // Check if the name already exists
  const nameExists = persons.some(person => person.name === name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  // Generate a new ID for the new person
  const newId = (Math.random() * 10000).toFixed(0);
  const newPerson = { id: newId, name, number };

  persons.push(newPerson); // Add the new person to the phonebook
  res.status(201).json(newPerson); // Respond with the new person and a 201 status code (Created)
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






