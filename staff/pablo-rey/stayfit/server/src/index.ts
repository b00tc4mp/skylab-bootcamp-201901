import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import context from './graphql/middleware/context';
import { createSchema } from './graphql/schema';


dotenv.config();
const {
  env: { PORT, MONGODB_URL },
} = process;

mongoose.connect(MONGODB_URL!, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error', err));

db.on('open', async () => {
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

  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`));
});
