import { add, defaultArguments } from './DefaultArguments';

const add2 = defaultArguments(add, { b: 9 });
const add3 = defaultArguments(add2, { b: 3, a: 2 });
const add4 = defaultArguments(add, { c: 3 });
const add5 = defaultArguments(add2, { a: 10 });

test('succeeds with default value for argument b only', () => {
  expect(add2(10)).toBe(19);
  expect(add2(10, 7)).toBe(17);
  expect(isNaN(add2())).toBe(true);
});

test('succeeds with default values for argument a and b', () => {
  expect(add3(10)).toBe(13);
  expect(add3()).toBe(5);
});

test('succeeds with default value for argument c only', () => {
  expect(isNaN(add4(10))).toBe(true);
  expect(add4(10, 10)).toBe(20);
});

test('succeeds with default value for argument a only', () => {
  expect(add5()).toBe(19);
});
