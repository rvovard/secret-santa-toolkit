export function shuffle<T>(list: T[]): T[] {
  const result: T[] = [];

  list.forEach((value) => {
    const len = result.length;
    const rand = Math.floor(Math.random() * (len + 1));

    result.splice(rand, 0, value);
  });

  return result;
}
