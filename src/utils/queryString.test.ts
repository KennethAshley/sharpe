import queryString from './queryString';

it('stringifies an object input a query string', () => {
  expect(
    queryString({ key: 'one', foo: "bar" })
  ).toEqual('key=one&foo=bar');
});

