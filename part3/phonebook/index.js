require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Person = require("./models/person");

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

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());

morgan.token("post", (req, res) => {
  if (req.method !== "POST") return " ";
  return JSON.stringify(req.body);
});
const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :post"
);
app.use(logger);

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()));
  });
});

app.get("/info", (request, response) => {
  response.write(`Phonebook has info for ${persons.length} people`);
  response.write("\n\n");
  response.write(new Date().toString());
  response.end();
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  // const personExists = persons.find(p => p.name === body.name);
  // if (personExists) {
  //   return response.status(400).json({
  //     error: "name must be unique"
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(personSaved => {
    response.json(personSaved.toJSON());
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name == "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
