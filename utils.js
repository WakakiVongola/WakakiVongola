export function normalizeString(str) {
    return str?.toLowerCase().trim() || '';
  }
  
  export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }
  