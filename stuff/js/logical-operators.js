function a() { console.log('a'); return !true; }
function b() { console.log('b'); return !false; }
function c() { console.log('c'); return true; }

if (a() || b() && c()) console.log('hi')
else console.log('bye')