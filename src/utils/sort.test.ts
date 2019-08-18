import sort from './sort';

interface Person {
  name: string;
  age: number;
};

const people: Person[] = [
  {
    name: 'ken',
    age: 28,
  },
  {
    name: 'bill',
    age: 47,
  },
  {
    name: 'tom',
    age: 7,
  },
];

it('sorts an array of objects in asc order', () => {
  expect(
    sort('name', 'asc', people)
  ).toEqual([
    {
      name: 'bill',
      age: 47,
    },
    {
      name: 'ken',
      age: 28,
    },
    {
      name: 'tom',
      age: 7,
    }
  ])
});

it('sorts an array of objects in desc order', () => {
  expect(
    sort('age', 'desc', people)
  ).toEqual([
    {
      name: 'bill',
      age: 47,
    },
    {
      name: 'ken',
      age: 28,
    },
    {
      name: 'tom',
      age: 7,
    },
  ]);
});

