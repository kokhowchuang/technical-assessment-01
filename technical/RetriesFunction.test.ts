import {
  retryFailures,
  createTargetFunction,
  CustomError,
} from './RetriesFunction';

test('succeeds on attempt number 3', () => {
  expect(retryFailures(createTargetFunction(3), 5)).resolves.toBe(3);
});

test('fails on attempt number 2 and throws last error', () => {
  expect(retryFailures(createTargetFunction(3), 2)).rejects.toThrowError(
    CustomError
  );
});

test('succeeds on attempt number 10', () => {
  expect(retryFailures(createTargetFunction(10), 10)).resolves.toBe(10);
});
