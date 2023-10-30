var Person = /** @class */ (function () {
    function Person(people) {
        this.people = people;
    }
    Person.prototype.add = function (person) {
        var personToCreate = {
            id: this._generateID(),
            name: person.name,
            address: person.address,
        };
        this.people.push(personToCreate);
    };
    Person.prototype.getAll = function () {
        return this.people;
    };
    Person.prototype.getByID = function (id) {
        console.log(this.people.find(function (person) { return person.id === id; }));
        return this.people.filter(function (person) { return person.id === id; })[0];
    };
    Person.prototype._generateID = function () {
        return this.people.length + 1;
    };
    return Person;
}());
// Init class
var people = [
    {
        id: 1,
        name: 'John',
        address: 'John alamat',
    },
    {
        id: 2,
        name: 'Riani',
        address: 'Riani alamat',
    },
];
var person = new Person(people);
console.log('List People:', person.getAll());
var personToCreate = {
    name: 'Asep',
    address: 'asep rumah',
};
console.log('Add New Person:', personToCreate);
person.add(personToCreate);
console.log('List People:', person.getAll());
