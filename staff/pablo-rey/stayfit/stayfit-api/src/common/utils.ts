/**
 * Returns a random integer number up to a, between a and b, or a random item of an array
 * 
 * If a is an array returns a random item of array
 * If a is a number returns a integer number 0 <= n < a (if a is negative returns a <= n < 0)
 * if a and b are a number return a integer between a and b
 * 
 * @param a 
 * @param b 
 */
export function random(a?: number | any[], b?: number): any {
  if (typeof a === 'undefined') return Math.random();
  if (a instanceof Array) return a[Math.floor(Math.random() * a.length)];
  if (typeof a === 'number' && typeof b === 'undefined') return Math.floor(Math.random() * a);
  if (typeof a === 'number' && typeof b === 'number') return Math.floor(a + Math.random() * (b - a));
}

/**
 * Compare 2 arrays and returns the items added, removed and unchanged in the oldOnes compared to newOnes
 * 
 * @param oldOnes 
 * @param newOnes 
 */
export function compareArrays(oldOnes: string[], newOnes: string[]) {
  const removeOld: string[] = [];
  const addNew: string[] = [];
  const unchanged: string[] = [];

  const all = distinct([...oldOnes, ...newOnes]);

  for (let v of all) {
    const o = oldOnes.includes(v);
    const n = newOnes.includes(v);
    if (o && n) unchanged.push(v);
    else if (o && !n) removeOld.push(v);
    else if (!o && n) addNew.push(v);
  }

  return { unchanged, addNew, removeOld };
}

/**
 * Returns a copy of array with unique values
 * 
 * @param arr Array of elements
 * @returns copy of array with unique values
 */
export function distinct(arr: any[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}
