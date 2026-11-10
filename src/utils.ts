export type Domino = [number, number];

export type SortOrder = "asc" | "desc";

export const sort = (
  dominoes: Domino[],
  order: SortOrder = "asc"
): Domino[] => {
  return [...dominoes].sort((a, b) => {
    const totalA = a[0] + a[1];
    const totalB = b[0] + b[1];

    return order === "asc"
      ? totalA - totalB
      : totalB - totalA;
  });
};

export const countDoubleNumber = (
  dominoes: Domino[]
): number => {
  return dominoes.filter(([a, b]) => a === b).length;
};

export const removeDuplicate = (
  dominoes: Domino[]
): Domino[] => {
  const frequency: Record<string, number> = {};

  dominoes.forEach(([a, b]) => {
    const key = [a, b].sort((x, y) => x - y).join("-");

    frequency[key] = (frequency[key] || 0) + 1;
  });

  return dominoes.filter(([a, b]) => {
    const key = [a, b].sort((x, y) => x - y).join("-");

    return frequency[key] === 1;
  });
};

export const flipDominoes = (
  dominoes: Domino[]
): Domino[] => {
  return dominoes.map(([a, b]) => [b, a]);
};

export const removeByTotal = (
  dominoes: Domino[],
  total: number
): Domino[] => {
  return dominoes.filter(([a, b]) => a + b !== total);
};
