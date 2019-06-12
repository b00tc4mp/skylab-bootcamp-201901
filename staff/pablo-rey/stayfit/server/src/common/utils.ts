export function random(a?: number | any[], b?: number): any {
  if (typeof a === 'undefined') return Math.random();
  if (a instanceof Array) return a[Math.floor(Math.random() * a.length)];
  if (typeof a === 'number' && typeof b === 'undefined') return Math.floor(Math.random() * a);
  if (typeof a === 'number' && typeof b === 'number') return Math.floor(a + Math.random() * (b - a));
}

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

export function distinct(arr: any[]) {
  return arr.filter((v, i, a) => a.indexOf(v) === i);
}
