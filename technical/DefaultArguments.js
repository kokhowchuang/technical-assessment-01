export function defaultArguments(func, defaultArgs) {
  // Get the arguments name on function
  const argNames = func
    .toString()
    .match(/\(([^)]*)\)/)[1]
    .split(',')
    .map((arg) => arg.trim())
    .filter((arg) => arg !== '...args');

  return function (...args) {
    const mergedArgs = { ...defaultArgs, ...args };

    if (argNames.length > 0) {
      Object.keys(defaultArgs).map((key) => {
        // Remove the passing arguments when it is not existed on the function arguments
        if (!argNames.includes(key)) {
          delete mergedArgs[key];
        }
      });
    }

    return func(...Object.values(mergedArgs));
  };
}

export function add(a, b) {
  return a + b;
}
