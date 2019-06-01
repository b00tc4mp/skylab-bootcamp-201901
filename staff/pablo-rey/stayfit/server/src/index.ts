import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import context from './logic/middleware/context';
import { createSchema } from './data/schemas/rootSchema';
import { cleanDb, populateDb } from './data/db-maintenance';

dotenv.config();
const {
  env: { PORT, MONGODB_URL },
} = process;

mongoose.connect(MONGODB_URL!, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error', err));

db.on('open', async () => {
  if (true) {
    await cleanDb();
    await populateDb();
  }
  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context,
  });

  const app = express();
  app.use(
    cors({
      credentials: true,
    })
  );
  app.use(cookieParser());

  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`));
});
