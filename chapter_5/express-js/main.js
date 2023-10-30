const express = require('express');
const fs = require('fs');

const listUser = require('./data/users.json');

const app = express();

// Add middleware to get the body from the request
app.use(express.json())

app.get("/api/users", (req, res) => {
  const nameQuery = req.query.name;

  const response = {
    status: "OK",
    message: "Success retrieving data",
    data: {
      users: listUser.filter(user => user.name.toLowerCase().includes(nameQuery.toLowerCase())),
    },
  }

  res.send(response);
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const user = listUser.find(user => user.id === id);

  if (!user) {
    const response = {
      status: "NOT_FOUND",
      message: "Data not found",
      data: {
        user: null,
      },
    }

    res.status(404).send(response);
  }

  const response = {
    status: "OK",
    message: "Success retrieving data",
    data: {
      user: user,
    },
  }

  res.status(200).send(response);
});

app.post("/api/users", (req, res) => {
  const payload = req.body;

  // Payload validation
  if (!payload.name) {
    const response = {
      status: "BAD_REQUEST",
      message: "Name cannot be empty",
      data: {
        created_user: null,
      },
    }

    res.status(400).send(response);
  }

  const userToCreate = {
    id: listUser[listUser.length - 1].id + 1,
    name: payload.name
  };

  listUser.push(userToCreate);

  fs.writeFileSync("./data/users.json", JSON.stringify(listUser))

  const response = {
    status: "CREATED",
    message: "User succesfully created",
    data: {
      created_user: userToCreate,
    },
  }

  res.status(201).send(response);
});

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
