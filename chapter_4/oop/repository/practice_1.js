class UserRepository {
  getAll() {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  add(user) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  getByID(id) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  deleteByID(id) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

class UserRepositoryPostgres extends UserRepository {
  constructor(users = []) {
    super();
    this.users = users;
  }

  getAll() {
    return this.users;
  }

  add(user) {
    this.users.push(user);

    return this.users;
  }

  getByID(id) {
    const user = this.users.filter((user) => user.id === id)[0];

    if (user == null) {
      return "user not found"
    }

    return user;
  }

  deleteByID(id) {
    this.users = this.users.filter((user) => user.id != id);

    return `user with id ${id} deleted successfully`;
  }
}

// Implementation
users = [
  {
    "id": 1,
    "name": "John",
  }
]

userPostgres = new UserRepositoryPostgres(users)

console.log("[userRepositoryPostgres] getAll(): " + JSON.stringify(userPostgres.getAll()))
console.log("[userRepositoryPostgres] add(): " + JSON.stringify(userPostgres.add({
  id: 2,
  name: "Danto"
})))
console.log("[userRepositoryPostgres] getByID(): " + JSON.stringify(userPostgres.getByID(1)))
console.log("[userRepositoryPostgres] deleteByID(): " + JSON.stringify(userPostgres.deleteByID(1)))
console.log("[userRepositoryPostgres] getAll(): " + JSON.stringify(userPostgres.getAll()))