export const debounceFetch = (fn: Function, debounceTime: number = 1000) => {
  let timerId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      fn(...args);
    }, debounceTime);
  };
};
