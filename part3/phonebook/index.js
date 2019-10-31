const express = require("express");
const app = express();
// const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
];

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.json());

// morgan.token("post", (req, res) => {
//   if (req.method !== "POST") return " ";
//   return JSON.stringify(req.body);
// });
// const logger = morgan(
//   ":method :url :status :res[content-length] - :response-time ms :post"
// );
// app.use(logger);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.write(`Phonebook has info for ${persons.length} people`);
  response.write("\n\n");
  response.write(new Date().toString());
  response.end();
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(p => p.id === id);

  if (!person) return response.status(404).end("No such person.");

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(p => p.id !== id);

  response.status(204).end();
});

const generateId = () => {
  const randomId = persons.length > 0 ? Math.floor(Math.random() * 100) : 0;
  return randomId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const personExists = persons.find(p => p.name === body.name);
  if (personExists) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  };

  persons = persons.concat(person);

  response.json(persons);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});