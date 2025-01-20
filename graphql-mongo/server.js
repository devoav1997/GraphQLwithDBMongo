const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const schema = require('./schema/userSchema');

const app = express();
app.use(cors());

// Menghubungkan ke MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Endpoint GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// Menjalankan server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
