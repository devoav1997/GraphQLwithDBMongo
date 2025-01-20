// Mengimpor library mongoose untuk menghubungkan dan berinteraksi dengan MongoDB
const mongoose = require('mongoose'); 
// Tipe data: Object (library mongoose)

// Membuat schema untuk koleksi User di MongoDB
const userSchema = new mongoose.Schema({
  // Field 'name' bertipe String untuk menyimpan nama pengguna
  name: String,   // Tipe data: String
  
  // Field 'email' bertipe String untuk menyimpan email pengguna
  email: String,  // Tipe data: String

  // Field 'age' bertipe Number untuk menyimpan usia pengguna
  age: Number     // Tipe data: Number
});
// Tipe data userSchema: Object (Schema Mongoose)

// Mengekspor model User agar dapat digunakan di file lain
module.exports = mongoose.model('User', userSchema); 
// 'User' adalah nama model (akan menjadi koleksi 'users' di MongoDB secara otomatis)
// 'userSchema' adalah struktur data (schema) untuk model User
// Tipe data export: Function (Model dari Mongoose)
