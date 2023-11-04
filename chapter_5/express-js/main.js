const express = require('express');
const fs = require('fs');

const listUser = require('./data/users.json');
const uploadFileUtil = require('./utils/uploadFile');

const app = express();

// Add middleware to get the body from the request
app.use(express.json())

app.get("/api/users", (req, res) => {
  const nameQuery = req.query.name;

  let filteredUsers = listUser;

  if (nameQuery) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(nameQuery.toLowerCase()))
  }

  const response = {
    status: "OK",
    message: "Success retrieving data",
    data: {
      users: filteredUsers,
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

app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const filteredUsers = listUser.filter(user => user.id !== id);
  fs.writeFileSync("./data/users.json", JSON.stringify(filteredUsers));

  const response = {
    status: "OK",
    message: "Success deleting data",
    data: {
      deleted_user: listUser.find(user => user.id === id),
    },
  };

  res.status(200).send(response);
});

app.post("/api/users", uploadFileUtil.single("profile_picture_url"), (req, res) => {
  const payload = req.body;
  console.log(payload)

  // Payload validation
  if (!payload.name) {
    const response = {
      status: "BAD_REQUEST",
      message: "Name cannot be empty",
      data: {
        created_user: null,
      },
    };

    res.status(400).send(response);
  }

  const userToCreate = {
    id: listUser[listUser.length - 1].id + 1,
    name: payload.name
  };

  listUser.push(userToCreate);

  fs.writeFileSync("./data/users.json", JSON.stringify(listUser));

  const response = {
    status: "CREATED",
    message: "User succesfully created",
    data: {
      created_user: userToCreate,
    },
  }

  res.status(201).send(response);
});

app.patch("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const payload = req.body;

  // Payload validation
  if (!payload.name) {
    const response = {
      status: "BAD_REQUEST",
      message: "Name cannot be empty",
      data: {
        created_user: null,
      },
    };

    res.status(400).send(response);
  };

  let updatedUser;

  const updatedUsers = listUser.filter((user) => {
    if (user.id === id) {
      user.name = payload.name;
      updatedUser = user;
    }

    return user;
  });

  fs.writeFileSync("./data/users.json", JSON.stringify(updatedUsers))

  const response = {
    status: "OK",
    message: "User succesfully updated",
    data: {
      updated_user: updatedUser,
    },
  }

  res.status(200).send(response);
});

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
