// Mengimpor beberapa tipe data dari library 'graphql' untuk membuat skema GraphQL
const { 
    GraphQLObjectType,  // Untuk mendefinisikan Object Type di GraphQL
    GraphQLString,      // Tipe data String di GraphQL
    GraphQLInt,         // Tipe data Integer di GraphQL
    GraphQLID,          // Tipe data ID unik di GraphQL
    GraphQLSchema,      // Untuk mendefinisikan Schema utama di GraphQL
    GraphQLList         // Untuk mendefinisikan List/Array di GraphQL
  } = require('graphql');
  
  // Mengimpor model User dari folder models/User.js (MongoDB Model)
  const User = require('../models/User'); 
  // Tipe data: Object (Mongoose Model)
  
  // Membuat tipe data User di GraphQL (schema untuk User)
  const UserType = new GraphQLObjectType({
    name: 'User',  // Nama ObjectType di GraphQL
    fields: () => ({  // Field yang dimiliki oleh User
      id: { type: GraphQLID },       // ID unik untuk user (ObjectID di MongoDB)
      name: { type: GraphQLString }, // Nama user (String)
      email: { type: GraphQLString },// Email user (String)
      age: { type: GraphQLInt }      // Usia user (Integer)
    })
  });
  // Tipe data UserType: Object (GraphQLObjectType)
  
  // Membuat Root Query untuk mendapatkan data user dari database
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',  // Nama untuk Root Query
    fields: {
      users: {  // Query untuk mendapatkan semua user
        type: new GraphQLList(UserType),  // Hasilnya berupa list/array dari UserType
        resolve() {  // Resolver function untuk mengambil data dari database
          return User.find();  // Mengambil semua data user dari MongoDB
        }
      }
    }
  });
  // Tipe data RootQuery: Object (GraphQLObjectType)
  
  // Membuat Mutation untuk menambahkan user baru ke database
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',  // Nama Mutation
    fields: {
      addUser: {  // Mutation untuk menambahkan user baru
        type: UserType,  // Hasilnya akan mengembalikan UserType
        args: {  // Argument yang dibutuhkan untuk menambah user
          name: { type: GraphQLString },  // Nama user (String)
          email: { type: GraphQLString }, // Email user (String)
          age: { type: GraphQLInt }       // Usia user (Integer)
        },
        resolve(parent, args) {  // Resolver function untuk menyimpan data ke database
          // Membuat user baru dengan data dari argument
          const user = new User({
            name: args.name,
            email: args.email,
            age: args.age
          });
          return user.save();  // Menyimpan user ke MongoDB dan mengembalikan data user
        }
      }
    }
  });
  // Tipe data Mutation: Object (GraphQLObjectType)
  
  // Mengekspor schema GraphQL yang sudah dibuat (Query dan Mutation)
  module.exports = new GraphQLSchema({
    query: RootQuery,      // Root Query untuk GET data
    mutation: Mutation     // Mutation untuk POST/CREATE data
  });
  // Tipe data export: Object (GraphQLSchema)
  