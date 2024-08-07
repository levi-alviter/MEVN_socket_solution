const MAX = 9;
// const MIN = 0;

const dummyNames = [
  "Egzon",
  "Jakub",
  "JC",
  "Monti",
  "Martina",
  "Stefani",
  "Tef",
  "Borjan",
  "Levi",
  "Dale",
];

export default () => {
  const randomIndex = Math.floor(Math.random() * MAX);
  return dummyNames[randomIndex];
};
