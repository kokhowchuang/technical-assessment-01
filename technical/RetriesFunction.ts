// Extends error with new field
export class CustomError extends Error {
  attempt: number;
}

export async function retryFailures<T>(
  fn: () => Promise<T>,
  retries: number
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (e: unknown) {
    if (e instanceof CustomError) {
      if (retries > e.attempt) {
        return retryFailures(fn, retries);
      } else {
        throw e;
      }
    }
  }
}

export function createTargetFunction(succeedsOnAttempt: number) {
  let attempt = 0;

  return async () => {
    if (++attempt === succeedsOnAttempt) {
      return attempt;
    }

    throw Object.assign(new CustomError(`failure`), { attempt });
  };
}
