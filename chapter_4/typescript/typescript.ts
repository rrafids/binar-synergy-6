// OOP
interface PersonObject {
  id?: number;
  name: string;
  address: string;
}

class Person {
  people: PersonObject[];

  constructor(people: PersonObject[]) {
    this.people = people;
  }

  add(person: PersonObject): void {
    const personToCreate: PersonObject = {
      id: this._generateID(),
      name: person.name,
      address: person.address,
    };

    this.people.push(personToCreate);
  }

  getAll(): PersonObject[] {
    return this.people;
  }

  getByID(id: number): PersonObject {
    return this.people.filter((person) => person.id === id)[0];
  }

  _generateID(): number {
    return this.people.length + 1;
  }
}

// Init class
const people: PersonObject[] = [
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

const person: Person = new Person(people);
console.log('List People:', person.getAll());

const personToCreate: PersonObject = {
  name: 'Asep',
  address: 'asep rumah',
};

console.log('Add New Person:', personToCreate);
person.add(personToCreate);

console.log('List People:', person.getAll());
