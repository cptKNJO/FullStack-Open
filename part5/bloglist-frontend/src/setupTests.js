import "@testing-library/jest-dom/extend-expect";

let savedItems = {};

const localStorageMock = {
  setItem: (key, value) => {
    savedItems[key] = value;
  },
  getItem: key => savedItems[key],
  clear: () => {
    savedItems = {};
  }
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });
