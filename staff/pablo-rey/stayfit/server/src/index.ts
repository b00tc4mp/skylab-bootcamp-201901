import "reflect-metadata";
import * as dotenv from 'dotenv';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';

import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/UserResolver";

dotenv.config();
const {
  env: { PORT, MONGODB_URL },
} = process;

mongoose.connect(MONGODB_URL!, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error', err));

db.on('open', async () => {
  // const apolloContext = require('./graphql/middleware/apolloContext');

  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();
  app.use(cors());

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
  );
});
