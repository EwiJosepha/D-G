let timeId: ReturnType<typeof setTimeout>; // Track the timer ID

export const debounceFetch = () => {
  return (fn: () => void, debounce_time = 1000) => {
    clearTimeout(timeId);
    timeId = setTimeout(fn, debounce_time);
  };
};