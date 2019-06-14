const { mv, cp } = require('./fs')

const { argv: [, , from, to] } = process

mv(from, to)

// DEMO $ node .  demo/d1 demo/d4