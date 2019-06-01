export function random(a?: number | any[], b?: number): any {
  if (typeof a === 'undefined') return Math.random();
  if (a instanceof Array) return a[Math.floor(Math.random() * a.length)];
  if (typeof a === 'number' && typeof b === 'undefined') return Math.floor(Math.random() * a);
  if (typeof a === 'number' && typeof b === 'number')
    return Math.floor(a + Math.random() * (b - a));
}

