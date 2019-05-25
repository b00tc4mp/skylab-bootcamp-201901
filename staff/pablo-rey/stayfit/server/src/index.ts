import * as dotenv from 'dotenv';
import * as express from 'express';

dotenv.config()
const { env: { PORT }} = process;

const app = express();

app.listen(PORT || 8000, () => {
  console.log(`listen on port ${PORT}`)  
})