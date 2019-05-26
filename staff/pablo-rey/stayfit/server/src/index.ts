import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
// import { User } from './models/User';

dotenv.config();
const {
  env: { PORT, MONGODB_URL },
} = process;

mongoose.connect(MONGODB_URL!);
const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error', err));

db.on('open', async () => {
  // const { ApolloServer } = require('apollo-server-express');
  // const rootSchema = require('./graphql/rootSchema');
  // const apolloContext = require('./graphql/middleware/apolloContext');
  // const apolloServer = new ApolloServer({
  //   schema: rootSchema,
  //   context: apolloContext,
  //   introspection: true,
  //   playground: true,
  // });

  // await User.create({name: 'pablo', surname: 'Rey', email: 'banana2dgmail!com', password:'123'})

  const app = express();
  app.use(cors);

  // apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => console.log(`listen on port ${PORT}`));
});
