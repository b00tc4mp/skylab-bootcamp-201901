require('dotenv').config();
const express = require('express');
const { mongoose } = require('./data');
const package = require('../package.json');
const router = require('./routes')

const {
  env: { DB_URL, PORT },
  argv: [, , port = PORT || 8080],
} = process;

mongoose
  .connect(DB_URL, { useNewUrlParser: true })
  .then(() => {
    const app = express();
    
    app.use('/api', router)

    app.listen(port, () =>
      console.log(
        '\x1b[32m',
        `${package.name} ${package.version} running on port ${port}`,
      ),
    );
  })
  .catch(console.error);

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('\x1b[31m', `\n ${package.name} ${package.version} stopped`);
  process.exit(0);
});
