import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value.
 *
 * @param value The value to be debounced.
 * @param delay The delay in milliseconds for the debounce.
 * @returns The debounced value.
 */
function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-call effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
