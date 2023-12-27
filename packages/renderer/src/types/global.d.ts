declare global {
  interface Window {
    electronAPI?: any;
  }
}

// Makes TS sees this as an external modules so we can extend the global scope.
export {};
