/* ============================================================
   Goodbite — Utility Helpers
   ============================================================ */

/** Format a number as currency */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/** Format date to readable string */
export const formatDate = (isoString) => {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/** Capitalize first letter */
export const capitalize = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/** Truncate text */
export const truncate = (str, len = 60) => {
  if (!str) return '';
  return str.length > len ? str.slice(0, len) + '...' : str;
};

/** Validate email */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/** Debounce helper */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/** Generate random order ID */
export const generateOrderId = () => {
  return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
