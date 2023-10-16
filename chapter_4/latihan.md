# Topic 1 - Class
1. Create an abstract class named UserRepository
This class doesn't have any porperty, you doesn't need to define the constructor
This class will have 2 function
First is getAll()
Second is add(user), this function receive object of user that need to be added
Please restrict all function to be called without being implemented first
You can throw an error
Eg: throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

2. Create a child class that extends UserRepository named UserRepositoryPostgres
This class will receive array of users property
users = [
    {
        "id": 1,
        "name": "Agus"
    }
]
getAll method will return all of users data
add method will append new data into users data array

3. Please try to instantiate the UserRepositoryPostgres
Please add corresponding data & try to get it all and print it