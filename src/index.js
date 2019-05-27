/* eslint-disable no-console */
import express from 'express';
import ip from 'ip';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';

import { graphqlSchema, graphqlResolver } from './graphql';

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || '8080';
const db = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@hungrycook-7h5ph.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.use('/graphql', graphqlHttp({
  schema: buildSchema(graphqlSchema),
  rootValue: graphqlResolver,
  graphiql: true,
}));

// Connect to MongoDB with Mongoose.
mongoose.connect(db, {
  useNewUrlParser: true,
  autoReconnect: true,
})
  .then(() => app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Local server: ${ip.address()}:${PORT}`);
  }))
  .catch(err => console.log(err));
