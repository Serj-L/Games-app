export const randomInteger = (minInt: number, maxInt: number): number => {
  return Math.floor(minInt + Math.random() * (maxInt + 1 - minInt));
};
